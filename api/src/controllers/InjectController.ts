// Express Dependencies
import { Request, Response } from "express";
// TypeOrm Dependencies
import { DataSource, Repository } from "typeorm";
// Application Utilities
import TokenHandler from "../utilities/TokenHandler";
// Base Controller
import Controller from "./Controller";
// Entities
import { ComponentType } from "../entities/ComponentType";
import { ComponentModel } from "../entities/ComponentModel";
import { ComponentUnit } from "../entities/ComponentUnit";
import { Token } from "../entities/Token";
import { User } from "../entities/User";
import { UserLogin } from "../entities/UserLogin";
import { StaticLogin } from "../entities/StaticLogin";
import { RecycleMaterial } from "../entities/RecycleMaterial";
import { Placement } from "../entities/Placement";
import { RecycleValue } from "../entities/RecycleValue";

/**
 * Development Controller to inject Data into Database
 */
export default class InjectController extends Controller {

    protected initialize(): void {
        this.addRoute('get', '/login', this.injectLogin);
        this.addRoute('get', '/components', this.injectComponents);
        this.addRoute('get', '/placement', this.injectPlacement);
        this.addRoute('get', '/recyclability', this.injectRecyclability);
        this.addRoute('get', '/testing', this.injectTesting);
    }

    async injectLogin(request: Request, response: Response): Promise<void> {
        // get Datasource from application
        const dataSource: DataSource = request.app.get('dataSource');
        const tokenHandler: TokenHandler = request.app.get('tokenHandler');

        // Create Casper User & Login
        let userToken = new Token();
        userToken.hash = tokenHandler.generateToken("hestetest");
        await dataSource.manager.save(userToken);
        let user = new User();
        user.username = "ndersorn";
        user.tokenId = userToken.id;
        await dataSource.manager.save(user);
        let userLogin = new UserLogin();
        userLogin.email = "casp7654@zbc.dk";
        userLogin.password = "hestetest";
        userLogin.userId = user.id;
        await dataSource.manager.save(userLogin);

        // Create Kevin User & Login
        userToken = new Token();
        userToken.hash = tokenHandler.generateToken("hestetest");
        await dataSource.manager.save(userToken);
        user = new User();
        user.username = "keviner123";
        user.tokenId = userToken.id;
        await dataSource.manager.save(user);
        userLogin = new UserLogin();
        userLogin.email = "kevi1580@zbc.dk";
        userLogin.password = "hestetest";
        userLogin.userId = user.id;
        await dataSource.manager.save(userLogin);

        // Create Static Login
        let staticToken = new Token();
        staticToken.hash = "HWKJERGSDGJFDSIGSFDM";
        await dataSource.manager.save(staticToken);
        let staticLogin = new StaticLogin();
        staticLogin.secret = "hestetest";
        staticLogin.tokenId = staticToken.id;
        await dataSource.manager.save(staticLogin);

        response.status(200).json({ message: "Test Data Injected" });
        return;

    }

    async injectComponents(request: Request, response: Response): Promise<void> {
        // get Datasource from application
        const dataSource: DataSource = request.app.get('dataSource');

        // Create Types with models
        const typeModelTestData: { id: number, type: string, models: { id: number, title: string }[] }[] = [
            {
                id: 1, type: "Unknown", models: [
                    { id: 1, title: "Unknown" },
                    { id: 2, title: "Danger" }
                ]
            },
            {
                id: 2, type: "Resistor", models: [
                    { id: 3, title: "Other" },
                    { id: 4, title: "1000Ω" },
                    { id: 5, title: "2000Ω" }
                ]
            },
            {
                id: 3, type: "Capasitor", models: [
                    { id: 6, title: "Other" },
                    { id: 7, title: "Ceramics" },
                    { id: 8, title: "Plastic films" },
                    { id: 9, title: "Oxide layered" },
                    { id: 10, title: "Natural" },
                ]
            },

            {
                id: 4, type: "Inductor", models: [
                    { id: 11, title: "Other" },
                    { id: 12, title: "Iron Cored" },
                    { id: 13, title: "Air Cored" },
                    { id: 14, title: "Powdered Iron Cored" },
                    { id: 15, title: "Ferrite Cored" },
                    { id: 16, title: "Variable" },
                ]
            },
            {
                id: 5, type: "Transistor", models: [
                    { id: 17, title: "Other" },
                ]
            },
            {
                id: 6, type: "Batteri", models: [
                    { id: 18, title: "Other" },
                    { id: 19, title: "A" },
                    { id: 20, title: "AA" },
                    { id: 21, title: "AAA" },
                    { id: 22, title: "AAAA" },
                    { id: 23, title: "1250" }
                ]
            },
        ];
        for (const object of typeModelTestData) {
            let type = new ComponentType();
            type.id = object.id;
            type.title = object.type;
            type = await dataSource.manager.save(type);
            for (const modelObject of object.models) {
                let model = new ComponentModel();
                model.id = modelObject.id;
                model.title = modelObject.title;
                model.typeId = type.id;
                model = await dataSource.manager.save(model);
            }
        }

        // Create Units by Type and Model
        const unitTestData: { id: number, type: string, model: string, weight: number }[] = [
            { id: 1, type: "Resistor", model: "1000Ω", weight: 0 },
            { id: 2, type: "Resistor", model: "1000Ω", weight: 0 },
            { id: 3, type: "Resistor", model: "2000Ω", weight: 0 },
            { id: 4, type: "Resistor", model: "1000Ω", weight: 0 },
            { id: 5, type: "Resistor", model: "Other", weight: 0 },
            { id: 6, type: "Resistor", model: "Other", weight: 0 },
            { id: 7, type: "Resistor", model: "Other", weight: 0 },
            { id: 8, type: "Resistor", model: "Other", weight: 0 },
            { id: 9, type: "Resistor", model: "Other", weight: 0 },
            { id: 10, type: "Capasitor", model: "Ceramics", weight: 0 },
            { id: 11, type: "Capasitor", model: "Natural", weight: 0 },
            { id: 12, type: "Capasitor", model: "Plastic films", weight: 0 },
            { id: 13, type: "Capasitor", model: "Other", weight: 0 },
            { id: 14, type: "Capasitor", model: "Other", weight: 0 },
            { id: 15, type: "Inductor", model: "Iron Cored", weight: 0 },
            { id: 16, type: "Inductor", model: "Iron Cored", weight: 0 },
            { id: 17, type: "Inductor", model: "Air Cored", weight: 0 },
            { id: 18, type: "Inductor", model: "Powdered Iron Cored", weight: 0 },
            { id: 19, type: "Inductor", model: "Variable", weight: 0 },
            { id: 20, type: "Inductor", model: "Variable", weight: 0 },
            { id: 21, type: "Inductor", model: "Other", weight: 0 },
            { id: 22, type: "Transistor", model: "Other", weight: 0 },
            { id: 23, type: "Transistor", model: "Other", weight: 0 },
            { id: 24, type: "Transistor", model: "Other", weight: 0 },
            { id: 25, type: "Transistor", model: "Other", weight: 0 },
            { id: 26, type: "Transistor", model: "Other", weight: 0 },
            { id: 27, type: "Batteri", model: "A", weight: 0 },
            { id: 28, type: "Batteri", model: "A", weight: 0 },
            { id: 29, type: "Batteri", model: "A", weight: 0 },
            { id: 30, type: "Batteri", model: "AA", weight: 0 },
            { id: 31, type: "Batteri", model: "AA", weight: 0 },
            { id: 32, type: "Batteri", model: "AA", weight: 0 },
            { id: 33, type: "Batteri", model: "AAA", weight: 0 },
            { id: 34, type: "Batteri", model: "AAA", weight: 0 },
            { id: 35, type: "Batteri", model: "1250", weight: 0 },
            { id: 36, type: "Batteri", model: "1250", weight: 0 },
            { id: 37, type: "Batteri", model: "1250", weight: 0 },
            { id: 38, type: "Batteri", model: "1250", weight: 0 },
            { id: 39, type: "Batteri", model: "Other", weight: 0 },
            { id: 40, type: "Batteri", model: "Other", weight: 0 },
            { id: 41, type: "Batteri", model: "Other", weight: 0 },
        ];

        const modelRepository = dataSource.manager.getRepository(ComponentModel);
        const typeRepository = dataSource.manager.getRepository(ComponentType);
        for (const object of unitTestData) {
            let unit = new ComponentUnit();
            unit.weight = object.weight + "";
            let type = await typeRepository.findOneBy({ title: object.type });
            if (type !== null) {
                let model = await modelRepository.findOneBy({ title: object.model, typeId: type.id });
                if (model !== null) {
                    unit.id = object.id
                    unit.modelId = model.id
                    unit.guid = `T:${type.title};M:${model.title}`;
                    unit = await dataSource.manager.save(unit);
                }
            }
        };

        response.status(200).json({ message: "Test Data Created" });
        return;
    }

    async injectPlacement(request: Request, response: Response): Promise<void> {
        // get Datasource from application
        const dataSource: DataSource = request.app.get('dataSource');

        // Create Placements
        const placements: { id: number, title: string }[] = [
            { id: 1, title: "Resell" },
            { id: 2, title: "Recycle" },
            { id: 3, title: "Repurpose" },
            { id: 4, title: "Other" },
        ];
        for (const object of placements) {
            let placement = new Placement();
            placement.id = object.id;
            placement.title = object.title;
            placement = await dataSource.manager.save(placement);
        }

        response.status(200).json({ message: "Test Data Created" });
        return;

    }

    async injectRecyclability(request: Request, response: Response): Promise<void> {
        // get Datasource from application
        const dataSource: DataSource = request.app.get('dataSource');

        // Create Materials
        const materials: { id: number, title: string, value: string }[] = [
            { id: 1, title: "Iron", value: "0.5" },
            { id: 2, title: "Nickel", value: "0.5" },
            { id: 3, title: "Copper", value: "0.5" },
            { id: 4, title: "Zinc", value: "0.5" },
            { id: 5, title: "Silver", value: "0.5" },
            { id: 6, title: "Gold", value: "0.5" },
            { id: 7, title: "Platinum", value: "0.5" },
            { id: 8, title: "Other", value: "0.5" },
        ];
        for (const object of materials) {
            let material = new RecycleMaterial();
            material.id = object.id;
            material.title = object.title;
            material.weightValue = object.value
            material = await dataSource.manager.save(material);
        }

        // Create RecycleValue
        const recycleValues: { id: number, material: number, modelid: number, value: string }[] = [

        ];

        const materialRepository = await dataSource.getRepository(RecycleMaterial);
        const modelRepository = await dataSource.getRepository(ComponentModel);
        for (const object of recycleValues) {
            let recycleValue = new RecycleValue();
            let material = await materialRepository.findOneBy({ id: object.material });
            if (material !== null) {
                let model = await modelRepository.findOneBy({ id: object.modelid });
                if (model !== null) {
                    recycleValue.materialId = material.id;
                    recycleValue.modelId = model.id;
                    recycleValue.weight = object.value
                }
            }
        }

        response.status(200).json({ message: "Test Data Created" });
        return;
    }

    async injectTesting(request: Request, response: Response): Promise<void> {
        // get Datasource from application
        const dataSource: DataSource = request.app.get('dataSource');

        // Create Test Definition

        // Create Test Result

        response.status(200).json({ message: "Test Data Created" });
        return;
    }

}