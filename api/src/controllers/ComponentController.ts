// Express Dependencies
import { Request, Response } from "express";
// TypeOrm Dependencies
import { DataSource } from "typeorm";
// Application Utilities
import RequestValidator from "../utilities/RequestValidator";
import { sortByIdCallback } from "../utilities/sortingCallbacks";
// Base Controller
import Controller from "./Controller";
// Entities
import { ComponentModel } from "../entities/ComponentModel";
import { ComponentType } from "../entities/ComponentType";
import { ComponentUnit } from "../entities/ComponentUnit";
// ViewModels
import { getComponent } from "../functions/getComponent";
/**
 * Component Controller used to get ViewModel Component Data
 */
export default class ComponentController extends Controller {

    protected initialize(): void {
        this.addRoute('get', "/", this.getAll);
        this.addRoute('get', "/:id", this.getById);
        this.addRoute('put', "/:id", this.updateById);
        this.addRoute('get', "/model/:id", this.getByModelId);
        this.addRoute('get', "/type/:id", this.getByTypeId);
        //this.addRoute('get', "/placement/:id", this.getByPlacementId);
    }

    async getAll(request: Request, response: Response): Promise<void> {
        response.status(500).json({
            title: "Intended internal default server error",
            message: "Default error route reached!"
        });
        return;
    }

    async getById(request: Request, response: Response): Promise<void> {
        // Get Application Utilities
        const dataSource: DataSource = request.app.get('dataSource');
        const requestValidator: RequestValidator = request.app.get('requestValidator');
        // Set Result object
        // Validate Parameters
        if (!requestValidator.validateKey(request.params, { key: "id", pass: parseInt })) {
            response.status(400).json({ message: "Invalid params" });
            return;
        }
        // Get By Id
        let id: number = +request.params.id;
        const component = await getComponent(dataSource, id);
        // Return if no entity found
        if (component === null) {
            response.status(204).json({ message: "No Record" });
            return;
        }
        response.status(200).json({ type: "Component", data: component });
    }

    async updateById(request: Request, response: Response): Promise<void> {
        // Get Application Utilities
        const dataSource: DataSource = request.app.get('dataSource');
        const requestValidator: RequestValidator = request.app.get('requestValidator');
        // Set Result object
        const restult = {}; // TODO:
        // Validate Parameters
        if (!requestValidator.validateKey(request.params, { key: "id", pass: parseInt })) {
            response.status(400).json({ message: "Invalid params" });
            return;
        }
        //TODO: Implement
        response.status(500).json({
            title: "Intended internal default server error",
            message: "Default error route reached!"
        });
        return;
    }

    async getByModelId(request: Request, response: Response): Promise<void> {
        // Get Application Utilities
        const dataSource: DataSource = request.app.get('dataSource');
        const requestValidator: RequestValidator = request.app.get('requestValidator');
        // Set Result object
        let result: Array<{ refId: number, refLabel: string, datalist: ComponentUnit[] }> = new Array();
        // Validate Parameters
        if (!requestValidator.validateKey(request.params, { key: "id", pass: parseInt })) {
            response.status(400).json({ message: "Invalid params" });
            return;
        }
        // Get By Id
        let id: number = +request.params.id;
        // get Model
        const model = await dataSource.getRepository(ComponentModel).findOneBy({ id: id });
        if (model === null) {
            response.status(204).json({ message: "No Record" });
            return;
        }
        // get Units from Model
        const units = (await dataSource.getRepository(ComponentUnit).findBy({ modelId: model.id })).sort((a, b) => sortByIdCallback(a, b));
        if (units.length > 0) {
            if (result[model.id] === undefined) {
                result[model.id] = {
                    refId: model.id,
                    refLabel: model.title,
                    datalist: [],
                };
            }
            result[model.id].datalist = ([...result[model.id].datalist, ...units]).sort((a, b) => sortByIdCallback(a, b));
        }
        // report when finished
        response.status(200).json({
            type: "Array<{refId:number,refLabel:string,datalist:ComponentUnit[]}>",
            data: result.filter((value) => value !== null),
        });
        return;
    }

    async getByTypeId(request: Request, response: Response): Promise<void> {
        // Get Application Utilities
        const dataSource: DataSource = request.app.get('dataSource');
        const requestValidator: RequestValidator = request.app.get('requestValidator');
        // Set Result object
        let result: Array<{ refId: number, refLabel: string, datalist: ComponentUnit[] }> = new Array();
        // Validate Parameters
        if (!requestValidator.validateKey(request.params, { key: "id", pass: parseInt })) {
            response.status(400).json({ message: "Invalid params" });
            return;
        }
        // Get By Id
        let id: number = +request.params.id;
        // get Types
        const type = await dataSource.getRepository(ComponentType).findOneBy({ id: id });
        if (type === null) {
            response.status(204).json({ message: "No Record" });
            return;
        }
        // get Models from types
        const models = (await dataSource.getRepository(ComponentModel).findBy({ typeId: type.id })).sort((a, b) => sortByIdCallback(a, b));
        for (const model of models) {
            // get Units from Model
            const units = (await dataSource.getRepository(ComponentUnit).findBy({ modelId: model.id })).sort((a, b) => sortByIdCallback(a, b));
            if (units.length > 0) {
                if (result[type.id] === undefined) {
                    result[type.id] = {
                        refId: type.id,
                        refLabel: type.title,
                        datalist: [],
                    };
                }
                result[type.id].datalist = ([...result[type.id].datalist, ...units]).sort((a, b) => sortByIdCallback(a, b));
            }
        }
        // report when finished
        response.status(200).json({
            type: "Array<{refId:number,refLabel:string,datalist:ComponentUnit[]}>",
            data: result.filter((value) => value !== null),
        });
        return;
    }

}