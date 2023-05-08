// Express Dependencies
import { Request, Response } from "express";
// TypeOrm Dependencies
import { DataSource } from "typeorm";
// Application Utilities
import RequestValidator from "../../utilities/RequestValidator";
import { sortByIdCallback } from "../../utilities/sortingCallbacks";
// Base Controller
import Controller from "./../Controller";
// Entities
import { ComponentModel } from "../../entities/ComponentModel";
import { ComponentType } from "../../entities/ComponentType";
import { ComponentUnit } from "../../entities/ComponentUnit";
// Functions
import { getComponent } from "../../functions/getComponent";
// ViewModels
import { ChartData } from "../../models/ChartData";
import { TableData } from "../../models/TableData";
/**
 * Overview View Controller used to get ViewModel Component Data
 */
export default class OverviewController extends Controller {

    protected initialize(): void {
        this.addRoute('get', "/table", this.getTableData);
        this.addRoute('get', "/dataset", this.getDatasetData);
    }

    async getTableData(request: Request, response: Response): Promise<void> {
        // Get Application Utilities
        const dataSource: DataSource = request.app.get('dataSource');
        // Set Result object
        let result: TableData = { labels: [], values: [] };
        // Set Labels
        result.labels = ["ID", "Type", "Model", "Count"];
        // get Models
        const models = (await dataSource.getRepository(ComponentModel).find()).sort((a, b) => sortByIdCallback(a, b));
        for (const model of models) {
            // get Type from model
            const type = await dataSource.getRepository(ComponentType).findOneBy({ id: model.typeId });
            // get Units from Model
            const units = (await dataSource.getRepository(ComponentUnit).findBy({ modelId: model.id })).sort((a, b) => sortByIdCallback(a, b));
            if (units.length > 0) {
                result.values.push([model.id.toString(), type?.title || "undefined", model.title, units.length.toString()]);
            }
        }
        // report when finished
        response.status(200).json({
            type: "TableData",
            data: result,
        });
        return;
    }

    async getDatasetData(request: Request, response: Response): Promise<void> {
        // Get Application Utilities
        const dataSource: DataSource = request.app.get('dataSource');
        const requestValidator: RequestValidator = request.app.get('requestValidator');
        // Set Result object
        let result: ChartData = { labels: [], datasets: [] };
        const types = (await dataSource.getRepository(ComponentType).find()).sort((a, b) => sortByIdCallback(a, b));
        for (const type of types) {
            // Set Label
            result.labels.push(type.title);
            // Dataset: Overall
            let index = 0;
            if (result.datasets[index] === undefined) {
                // get Models from type.id
                result.datasets.push({
                    label: 'Overall',
                    data: []
                });
            }
            let count = 0
            const models = (await dataSource.getRepository(ComponentModel).findBy({ typeId: type.id })).sort((a, b) => sortByIdCallback(a, b));
            if (models !== null) {
                for (const model of models) {
                    // get Units from Model
                    const units = (await dataSource.getRepository(ComponentUnit).findBy({ modelId: model.id })).sort((a, b) => sortByIdCallback(a, b));
                    if (units !== null) {
                        if (units.length > 0) {
                            count += units.length;
                        }
                    }
                }
            }
            result.datasets[index].data.push(count);
            // TODO: Set Dataset: Phase1
            index = 1;
            // TODO: Set Dataset: Phase2
            index = 2;
            // TODO: Set Dataset: Phase3 
            index = 3;
        }
        // report when finished
        response.status(200).json({
            type: "ChartData",
            data: result,
        });
        return;
    }
}