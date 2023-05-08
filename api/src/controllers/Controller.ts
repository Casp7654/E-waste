// Express Dependencies
import { Request, Response } from 'express';

// Custom Request & Route Types
export type RequestPath = string;
export type RequestMethods = 'get' | 'post' | 'put' | 'delete';
export type RouteFunction = (request: Request, response: Response) => void;
export type RouteConfig = {
    method: RequestMethods;
    path: RequestPath;
    callback: RouteFunction;
}

/**
 * Abstract Base Controller
 */
export default abstract class Controller {

    protected _routes: RouteConfig[] = [];
    
    public get routes(): RouteConfig[] {
        return this._routes;
    }

    constructor() {
        this.initialize();
    }

    protected abstract initialize(): void;

    protected addRoute(method: RequestMethods, path: RequestPath, callback: RouteFunction): void {
        this.routes.push({ method: method, path: path, callback: callback });
    }
}