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
export const handleNavigationBarExceptions = (exception: AxiosError, redirectCallback?: CallableFunction): string => {
    let retnValue: string = '';
    switch (exception.response?.status) {
        case 400: {
            retnValue = 'session is empty';
            if (redirectCallback !== undefined) redirectCallback();
            break;
        }
        case 401: {
            retnValue = 'invalid session - do authorization';
            if (redirectCallback !== undefined) redirectCallback();
            break;
        }
        default: {
            break;//del
        }
    }
    return retnValue;
}
export const saveBannerResponceExceptions = (exception: AxiosError): string => {
    let retnValue: string = '';
    switch (exception.response?.status) {
        case 409: {
            retnValue = 'banner name is already exist!';
            break;
        }
        case 402: {
            retnValue = 'linked categories cannot be empty!';
            break;
        }
        case 417: {
            retnValue = 'name or text field must be longer than 2 characters!';
            break;
        }
        default: {
            retnValue = 'internal error on server!';
        }
    }
    return retnValue;
}
export const saveCategoryResponseExceptions = (exception: AxiosError): string => {
    let retnValue: string = '';
    switch (exception.response?.status) {
        case 409: {
            retnValue = 'category name | request id already exist!';
            break;
        }
        case 402: {
            retnValue = 'category name | request id cannot be empty!';
            break;
        }
        case 417: {
            retnValue = 'name or requestId must be longer than 2 characters!';
            break;
        }
        default: {
            retnValue = 'internal error on server!';
        }
    }
    return retnValue;
}
export const deleteBannerResponseException = (exception: AxiosError): string => {
    let retnValue: string = '';
    switch (exception.response?.status) {
        case 409: {
            retnValue = 'incorrect index send to server!';
            break;
        }
        default: {
            retnValue = 'internal error on server!';
        }
    }
    return retnValue;
}
export const deleteCategoryResponseExceptions = (exception: AxiosError): string => {
    let retnValue: string = '';
    switch (exception.response?.status) {
        case 409: {
            retnValue = 'category linked with some banner!';
            break;
        }
        default: {
            retnValue = 'internal error on server!';
        }
    }
    return retnValue;
}
