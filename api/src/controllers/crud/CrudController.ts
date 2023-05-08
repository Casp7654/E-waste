// Express Dependencies
import { Request, Response } from "express";
// Base Controller
import Controller from "./../Controller";

/**
 * Dynamic CRUD Controller
 */
export default abstract class CrudController extends Controller {

    protected initialize(): void {
        this.addRoute('get', "/", this.index);
        this.addRoute('post', "/", this.create);
        this.addRoute('get', "/:id", this.read);
        this.addRoute('put', "/:id", this.update);
        this.addRoute('delete', "/:id", this.delete);
    }

    abstract index(request: Request, response: Response): Promise<void>;
    abstract create(request: Request, response: Response): Promise<void>;
    abstract read(request: Request, response: Response): Promise<void>;
    abstract update(request: Request, response: Response): Promise<void>;
    abstract delete(request: Request, response: Response): Promise<void>;

}