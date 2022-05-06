import { AxiosError } from "axios";

export const handleBasicApiStatusCodeResponce = (exception: AxiosError): string => {
    let retnValue: string = '';
    switch (exception.response?.status) {
        case 401: {
            retnValue = 'Denied access - not authorized';
            break;
        }
        default: {

            break;//del
        }
    }
    return retnValue;
}
export const handleNavigationBarExceptions = (exception: AxiosError): string => {
    let retnValue: string = '';
    switch (exception.response?.status) {
        case 400: {
            retnValue = 'session is empty';
            break;
        }
        case 401: {
            retnValue = 'invalid session - do authorization';
            break;
        }
        default: {
            break;//del
        }
    }
    return retnValue;
}