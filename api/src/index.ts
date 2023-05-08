// Environment Variables
import dotenv from "dotenv";

// Express Http Handler
import express from 'express';

// Middleware
import bodyParser from 'body-parser';
import cors from 'cors';
import { loggerMiddleware } from './middleware/logger';
import RequestValidator from "./utilities/RequestValidator";
import TokenHandler from "./utilities/TokenHandler";

// TypeOrm DataSource
import { DataSource } from "typeorm";
import { getDataSource } from "./utilities/DataSource";

// Controllers
import Controller from "./controllers/Controller";
import DefaultController from "./controllers/DefaultController";
import AuthController from "./controllers/AuthController";
// Testing Controller
import InjectController from "./controllers/InjectController";
// Crud Controllers
import UserCrudController from "./controllers/crud/UserCrudController";
import ComponentUnitCrudController from "./controllers/crud/ComponentUnitCrudController";
import ComponentModelCrudController from "./controllers/crud/ComponentModelCrudController";
import ComponentTypeCrudController from "./controllers/crud/ComponentTypeCrudController";
// Registration Endpoint
import ComponentController from "./controllers/ComponentController";
// View Endpoints
import OverviewController from "./controllers/view/OverviewController";

// Read Environment file
dotenv.config({ path: `./${process.env.ENVFILE || '.env'}` });
const ENV: NodeJS.ProcessEnv = process.env || {};

// Async Server Initialization
(async (app: express.Application) => {

    // Initialize DataSource
    const dataSource = await getDataSource(ENV).initialize()
        .then((dataSource: DataSource) => {
            console.log("Data Source initialized correctly");
            return dataSource; // return to parent stack 
        }).catch((err: any) => {
            console.log("Data Source Failed!");
            throw new Error(err);
        });

    // Recheck DataSource
    if (dataSource === undefined) {
        throw new Error("DataSource return [undefined]");
    }

    // Set Application Utilities
    app.set('dataSource', dataSource);
    app.set('requestValidator', new RequestValidator());
    app.set('tokenHandler', new TokenHandler())

    // Add Middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors({ origin: ENV.WEB_ENDPOINT }));
    app.use(loggerMiddleware)

    // Initialize Controllers as Endpoints
    const controllers: Map<string, Controller> = new Map([]);
    controllers.set('/', new DefaultController());
    // Dev Endpoint
    if (ENV.ENV_MODE === "debug") {
        controllers.set('/inject', new InjectController()); // for Dev only
    }
    // Authentication Endpoint
    controllers.set('/auth', new AuthController());
    // CRUD Endpoints
    controllers.set('/users', new UserCrudController());
    controllers.set('/units', new ComponentUnitCrudController());
    controllers.set('/models', new ComponentModelCrudController());
    controllers.set('/types', new ComponentTypeCrudController());
    // Administration Endpoints
    controllers.set('/components', new ComponentController());
    // View Endpoints
    controllers.set('/overview', new OverviewController());


    // Set Controller route to new Router and put it into the app
    controllers.forEach((controller: Controller, path: string) => {
        let router = express.Router();
        for (const route of controller.routes) {
            let routeMethod: Function;
            switch (route.method) {
                case 'get':
                    router.get(`${route.path}`, route.callback);
                    break;
                case 'post':
                    router.post(`${route.path}`, route.callback);
                    break;
                case 'put':
                    router.put(`${route.path}`, route.callback);
                    break;
                case 'delete':
                    router.delete(`${route.path}`, route.callback);
                    break;
            }
        }
        app.use(path, router);
    });

    // Start Listen
    const port = ENV.API_PORT || 8080;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });

    return;

})(express());

// end of main call stack