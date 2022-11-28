import { Request, Response, NextFunction } from 'express';
import { RequestError } from '../helpers';

const validationBody = (schema: any) => {
    const func =  (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
             const reqError = RequestError(400, error.message);
            next(reqError);
        }
        next()
    }
    return func
}
 export default validationBody