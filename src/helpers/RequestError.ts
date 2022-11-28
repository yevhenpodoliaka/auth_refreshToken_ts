import { IRequestError } from '../interfaces';

const RequestError = (status: number, message: string): IRequestError => {
    const error: IRequestError = new Error(message);
    error.status = status;
    return error;
}

export default RequestError;