// Express Dependencies
import { Request, Response } from "express";

// Base Controller
import Controller from "./Controller";

/**
 * Default Controller for base route: "/"
 */
export default class DefaultController extends Controller {

    protected initialize(): void {
        this.addRoute('get', "/", this.index);
    }

    async index(request: Request, response: Response): Promise<void> {
        response.status(200).json({
            title: "Api Root",
            message: "Welcome to the Registration Server",
        });
        return;
    }

}