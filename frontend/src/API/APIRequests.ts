import axios, { AxiosError, AxiosResponse } from "axios";
import { URLSearchParams } from "url";
import { IBanner } from "../interfaces/IBanner";
import { ICategory } from "../interfaces/ICategory";
import { IRequestConfig } from "../interfaces/IRequestConfig";

const requestConfigFabric = (jwt: string): IRequestConfig => {
    if (jwt === undefined) {
        jwt = '';
    }
    const config: IRequestConfig = {
        headers: {
            "Authorization": "Bearer ".concat(jwt)
        }
    };
    return config;
}
class API {
    constructor() {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }
    readonly urlPrivate: string = 'http://localhost:8080/api/private';
    readonly urlPublic: string = 'http://localhost:8080';// bid = endpoint - public
    async authenticate(login: string, password: string, jwtToken: string, onSuccessCall: CallableFunction, onFailCallback: CallableFunction) {
        const response = await axios.post(`${this.urlPublic}/authenticate`, {
            'login': login,
            'password': password
        }, requestConfigFabric(jwtToken)).then((data: AxiosResponse) => {
            onSuccessCall(data.data.token);
        }).catch((exception: AxiosError) => {

            if (exception.response?.status === 401)/*bad credentials */ {
                onFailCallback(exception.response.data);
            }
        });
    };
    async refreshToken(jwtToken: string) {
        const responce = await axios.get(`${this.urlPublic}/refresh`, requestConfigFabric(jwtToken));
        return responce.data.token;
    }
    async getBanners(jwtToken: string) {
        const request = await axios.get<IBanner[]>(`${this.urlPrivate}/getBanners`, requestConfigFabric(jwtToken));
        return request;
    };
    async getCategories(jwtToken: string) { //PUBLIC CUZ U NEED TO GET LIST OF CATEGORIES IN HOME PAGE
        const request = await axios.get<ICategory[]>(`${this.urlPublic}/api/public/getCategories`, requestConfigFabric(jwtToken));
        return request;
    };
    saveBanner(jwtToken: string, queryParams: URLSearchParams, banner: IBanner | undefined) {
        if (banner === undefined) return;
        const request = axios.put<string>(`${this.urlPrivate}/banners/save/${banner.id}?${queryParams.toString()}`, banner, requestConfigFabric(jwtToken));
        return request;
    };
    saveCategory(jwtToken: string, queryParams: URLSearchParams, category: ICategory | undefined) {
        if (category === undefined) return;
        const request = axios.put<string>(`${this.urlPrivate}/categories/save/${category.id}?${queryParams.toString()}`, category, requestConfigFabric(jwtToken));
        return request;
    };
    deleteBanner(jwtToken: string, id: number | undefined) {
        if (id === undefined || id <= 0) return;
        const request = axios.put<string>(`${this.urlPrivate}/banners/delete/${id}`, requestConfigFabric(jwtToken));
        return request;
    };
    deleteCategory(jwtToken: string, id: number | undefined) {
        if (id === undefined || id <= 0) return;
        const request = axios.put<string>(`${this.urlPrivate}/categories/delete/${id}`, null, requestConfigFabric(jwtToken));
        return request;
    };
    getBannerByCategories(query: any) {
        const request = axios.get<string>(`${this.urlPublic}/bid${query.search}`);
        return request;
    }
}
export default new API();