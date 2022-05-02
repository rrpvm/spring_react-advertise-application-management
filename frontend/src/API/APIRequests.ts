import axios from "axios";
import { IBanner } from "../interfaces/IBanner";
import { ICategory } from "../interfaces/ICategory";

class API {
    readonly urlPrivate: string = 'http://localhost:8080/api/private';
    constructor() {
        // axios.defaults.headers.get['Content-Type:'] = 'application/json';
        axios.defaults.headers.post['Content-Type:'] = 'application/json';
    }
    getBanners(): IBanner[] {
        const request = axios.get(`${this.urlPrivate}/banners`);
        let responce_data: Array<IBanner> = [];
        request.then(responce => {
            responce_data = responce.data;
        }).catch(exception => console.log(exception));
        console.log(responce_data);
        return responce_data;
    };
    getCategoris(): ICategory[] {
        const request = axios.get(`${this.urlPrivate}/categories`);
        let responce_data: Array<ICategory> = [];
        request.then(responce => {
            responce_data = responce.data;
        }).catch(exception => console.log(exception));
        console.log(responce_data);
        return responce_data;
    };
}
const AppAPI = new API();
export default AppAPI;