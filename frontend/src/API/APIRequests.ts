import axios from "axios";
import { IBanner } from "../interfaces/IBanner";
import { ICategory } from "../interfaces/ICategory";
interface IRequestConfig {
    headers: {
        "Authorization":string,
    }
}
class API {
    constructor() {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }
    readonly urlPrivate: string = 'http://localhost:8080/api/private';
    readonly urlPublic: string = 'http://localhost:8080';
    async authenticate(login: string, password: string, jwtToken : string) {
        const config: IRequestConfig = {
            headers: {
                "Authorization":"Bearer ".concat(jwtToken)
            }
        };
        const responce = await axios.post(`${this.urlPublic}/authenticate`, {
            'login': login,
            'password': password
        }, config);
        return responce.data.token;
    };
    async getBanners(jwtToken:string) {
        const config: IRequestConfig = {
            headers: {
                "Authorization":"Bearer ".concat(jwtToken)
            }
        };
        const request =  await axios.get<IBanner[]>(`${this.urlPrivate}/banners`, config);
        return request;
    };
    async saveBanner(jwtToken:string, banner : IBanner|undefined) {
        if(banner === undefined)return;
        const config: IRequestConfig = {
            headers: {
                "Authorization":"Bearer ".concat(jwtToken)
            }
        };
        const request =  await axios.put<string>(`${this.urlPrivate}/banners/save/${banner.id}`,banner, config);
        return request;
    };
    async getCategories(jwtToken:string) {
        const config: IRequestConfig = {
            headers: {
                "Authorization":"Bearer ".concat(jwtToken)
            }
        };
        const request =  await axios.get<ICategory[]>(`${this.urlPrivate}/categories`, config);
        return request;
    };

}
const AppAPI = new API();
export default AppAPI;