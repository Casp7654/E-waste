import { Request, Response} from 'express';

export const loggerMiddleware = (request: Request, response: Response, next: Function): void => {
    console.debug(`${request.ip}: ${request.method} ${request.path}`);
    next();
}
