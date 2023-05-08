// Express Dependencies
import { Request, Response } from "express";
// TypeOrm Dependencies
import { DataSource } from "typeorm";
// Application Utilities
import RequestValidator from "../../utilities/RequestValidator";
// Base Controller
import CrudController from "./CrudController";
// Entities
import { ComponentType } from "../../entities/ComponentType";

export default class ComponentTypeCrudController extends CrudController {

    async index(request: Request, response: Response): Promise<void> {
        // Get Application Utilities
        const dataSource: DataSource = request.app.get('dataSource');
        // Queue response promize for resolve
        const typeRepository = dataSource.getRepository(ComponentType);
        const types = await typeRepository.find();
        // Return if no entities found
        if (types === undefined) {
            response.status(204).json({ message: "No Records" });
            return;
        }
        response.status(200).json({ type: "ComponentType[]", data: types });
    }

    async create(request: Request, response: Response): Promise<void> {
        // Get Application Utilities
        const dataSource: DataSource = request.app.get('dataSource');
        const requestValidator: RequestValidator = request.app.get('requestValidator');
        // Validate Parameters
        if (!requestValidator.validateKeys(request.body, [
            { key: "title", pass: isNaN },
        ])) {
            response.status(400).json({ message: "Invalid params" });
            return;
        }
        // Deconstruct request body
        const { title } = request.body;
        // Create
        const type = new ComponentType();
        type.title = title;
        await dataSource.manager.save(type);
        // Report
        response.status(200).json({
            message: "Type successfully created",
            type: "ComponentType",
            data: type,
        });
        return
    }

    async read(request: Request, response: Response): Promise<void> {
        // Get Application Utilities
        const dataSource: DataSource = request.app.get('dataSource');
        const requestValidator: RequestValidator = request.app.get('requestValidator');
        // Validate Parameters
        if (!requestValidator.validateKey(request.params, { key: "id", pass: parseInt })) {
            response.status(400).json({ message: "Invalid params" });
            return;
        }
        // Get By Id
        let id: number = +request.params.id;
        const type = await dataSource.getRepository(ComponentType).findOneBy({ id: id });
        // Return if no entity found
        if (type === null) {
            response.status(204).json({ message: "No Record" });
            return;
        }
        response.status(200).json({ type: "ComponentType", data: type });
    }

    async update(request: Request, response: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async delete(request: Request, response: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }
}