import axios from "axios";
import { URLSearchParams } from "url";
import { IBanner } from "../interfaces/IBanner";
import { ICategory } from "../interfaces/ICategory";
import { IRequestConfig } from "../interfaces/IRequestConfig";

const requestConfigFabric = (jwt: string): IRequestConfig => {
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
    async authenticate(login: string, password: string, jwtToken: string) {
        const responce = await axios.post(`${this.urlPublic}/authenticate`, {
            'login': login,
            'password': password
        }, requestConfigFabric(jwtToken));
        return responce.data.token;
    };
    async refreshToken(jwtToken: string) {
        const responce = await axios.get(`${this.urlPublic}/refresh`, requestConfigFabric(jwtToken));
        return responce.data.token;
    }
    async getBanners(jwtToken: string) {
        const request = await axios.get<IBanner[]>(`${this.urlPrivate}/getBanners`, requestConfigFabric(jwtToken));
        return request;
    };
    async getCategories(jwtToken: string) {
        const request = await axios.get<ICategory[]>(`${this.urlPrivate}/getCategories`, requestConfigFabric(jwtToken));
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
        const request = axios.delete<string>(`${this.urlPrivate}/banners/delete/${id}`, requestConfigFabric(jwtToken));
        return request;
    };
    deleteCategory(jwtToken: string, id: number | undefined) {
        if (id === undefined || id <= 0) return;
        const request = axios.put<string>(`${this.urlPrivate}/categories/delete/${id}`, null, requestConfigFabric(jwtToken));
        return request;
    };
}
export default new API();