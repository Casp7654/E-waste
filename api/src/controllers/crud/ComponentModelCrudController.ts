// Express Dependencies
import { Request, Response } from "express";
// TypeOrm Dependencies
import { DataSource } from "typeorm";
// Application Utilities
import RequestValidator from "../../utilities/RequestValidator";
// Base Controller
import CrudController from "./CrudController";
// Entities
import { ComponentModel } from "../../entities/ComponentModel";
import { ComponentType } from "../../entities/ComponentType";

export default class ComponentModelCrudController extends CrudController {

    async index(request: Request, response: Response): Promise<void> {
        // Get Application Utilities
        const dataSource: DataSource = request.app.get('dataSource');
        // Queue response promize for resolve
        const modelRepository = dataSource.getRepository(ComponentModel);
        const entities = await modelRepository.find();
        // Return if no entities found
        if (entities === undefined) {
            response.status(204).json({ message: "No Records" });
            return;
        }
        response.status(200).json({ type: "ComponentModel[]", data: entities });
    }

    async create(request: Request, response: Response): Promise<void> {
        // Get Application Utilities
        const dataSource: DataSource = request.app.get('dataSource');
        const requestValidator: RequestValidator = request.app.get('requestValidator');
        // Validate Parameters
        if (!requestValidator.validateKeys(request.body, [
            { key: "title", pass: isNaN },
            { key: "type", pass: parseInt },
        ])) {
            response.status(400).json({ message: "Invalid params" });
            return;
        }
        // Deconstruct request body
        const { title, type } = request.body;
        // Check Type
        const componentType = await dataSource.getRepository(ComponentType).findOneBy({ id: type });
        if (componentType === null) {
            response.status(400).json({ message: `Request denied, type with id ${type} was not found` })
            return;
        }
        // Create
        const model = new ComponentModel();
        model.title = title;
        model.typeId = type;
        await dataSource.manager.save(model);
        // Report
        response.status(200).json({
            message: "Type successfully created",
            type: "ComponentModel",
            data: model,
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
        const entity = await dataSource.getRepository(ComponentModel).findOneBy({ id: id });
        // Return if no entity found
        if (entity === null) {
            response.status(204).json({ message: "No Record" });
            return;
        }
        response.status(200).json({ type: "ComponentModel", data: entity });
    }

    async update(request: Request, response: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async delete(request: Request, response: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }
}