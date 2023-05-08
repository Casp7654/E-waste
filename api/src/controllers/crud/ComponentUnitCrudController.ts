// Express Dependencies
import { Request, Response } from "express";
// TypeOrm Dependencies
import { DataSource } from "typeorm";
// Application Utilities
import RequestValidator from "../../utilities/RequestValidator";
// Base Controller
import CrudController from "./CrudController";
// Entities
import { ComponentUnit } from "../../entities/ComponentUnit";
import { ComponentType } from "../../entities/ComponentType";
import { ComponentModel } from "../../entities/ComponentModel";

export default class ComponentUnitCrudController extends CrudController {

    async index(request: Request, response: Response): Promise<void> {
        // Get Application Utilities
        const dataSource: DataSource = request.app.get('dataSource');
        // Queue response promize for resolve
        const unitRepository = dataSource.getRepository(ComponentUnit);
        const entities = await unitRepository.find();
        // Return if no entities found
        if (entities === undefined) {
            response.status(204).json({ message: "No Records" });
            return;
        }
        response.status(200).json({ type: "ComponentUnit[]", data: entities });
    }

    async create(request: Request, response: Response): Promise<void> {
        // Get Application Utilities
        const dataSource: DataSource = request.app.get('dataSource');
        const requestValidator: RequestValidator = request.app.get('requestValidator');
        // Validate Parameters
        if (!requestValidator.validateKeys(request.body, [
            { key: "type", pass: parseInt },
            { key: "model", pass: parseInt },
        ])) {
            response.status(400).json({ message: "Invalid params" });
            return;
        }
        // Deconstruct request body
        const { model, type } = request.body;
        // Check Type
        const componentType = await dataSource.getRepository(ComponentType).findOneBy({ id: type });
        if (componentType === null) {
            response.status(400).json({ message: `Request denied, type with id ${type} was not found` })
            return;
        }
        // Check Model
        const componentModel = await dataSource.getRepository(ComponentModel).findOneBy({ id: model, typeId: type });
        if (componentModel === null) {
            response.status(400).json({ message: `Request denied, model with id ${model} of type ${type} was not found` })
            return;
        }
        // Create Component
        const unit = new ComponentUnit();
        unit.modelId = componentModel.id;
        unit.weight = (parseInt(request.body.weight) || 0.00) + "";
        await dataSource.manager.save(unit);
        // Report
        response.status(200).json({
            message: "Unit successfully created",
            type: "ComponentUnit",
            data: unit,
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
        const entity = await dataSource.getRepository(ComponentUnit).findOneBy({ id: id });
        // Return if no entity found
        if (entity === null) {
            response.status(204).json({ message: "No Record" });
            return;
        }
        response.status(200).json({ type: "ComponentUnit", data: entity });
    }

    async update(request: Request, response: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async delete(request: Request, response: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }
}