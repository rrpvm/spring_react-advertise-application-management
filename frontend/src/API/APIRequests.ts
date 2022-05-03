import axios from "axios";
import { IBanner } from "../interfaces/IBanner";
import { ICategory } from "../interfaces/ICategory";

class API {
    readonly urlPrivate: string = 'http://localhost:8080/api/private';
    constructor() {
        // axios.defaults.headers.get['Content-Type:'] = 'application/json';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }
     getBanners() {
        const request =  axios.get<IBanner[]>(`${this.urlPrivate}/banners`);
        return request;
    };
    getCategoris(): ICategory[] {
        const request = axios.get(`${this.urlPrivate}/categories`);
        let responce_data: Array<ICategory> = [];
        request.then(responce => {
            responce_data = responce.data;
        }).catch(exception => console.log(exception));
        return responce_data;
    };
    async logIn(_login: string, _password: string) {
        let responce = await axios.post('http://localhost:8080/login', {
            login: _login,
            password: _password
        });
        return responce.data;
    };
}
const AppAPI = new API();
export default AppAPI;