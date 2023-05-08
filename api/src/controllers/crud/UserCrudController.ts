// Express Dependencies
import { Request, Response } from "express";
// TypeOrm Dependencies
import { DataSource, Repository } from "typeorm";
// Application Utilities
import RequestValidator from "../../utilities/RequestValidator";
import TokenHandler from "../../utilities/TokenHandler";
// Base Controller
import CrudController from "./CrudController";
// Entities
import { User } from "../../entities/User";
import { Token } from "../../entities/Token";
import { UserLogin } from "../../entities/UserLogin";

export default class UserCrudController extends CrudController {

    async index(request: Request, response: Response): Promise<void> {
        // Get Application Utilities
        const dataSource: DataSource = request.app.get('dataSource');
        // Get Entities from DataSource
        const repository: Repository<User> = dataSource.getRepository(User);
        const entities = await repository.find();
        // Send response if no entities
        if (entities === undefined) {
            response.status(204).json({ message: "No Records" });
            return;
        }
        // Send response
        response.status(200).json({ type: `User[]`, data: entities });
    }

    async create(request: Request, response: Response): Promise<void> {
        // Get Application Utilities
        const dataSource: DataSource = request.app.get('dataSource');
        const requestValidator: RequestValidator = request.app.get('requestValidator');
        const tokenHandler: TokenHandler = request.app.get('tokenHandler');
        // Validate Parameters
        if (!requestValidator.validateKeys(request.body, [
            { key: "username", pass: isNaN },
            { key: "email", pass: isNaN },
            { key: "password", pass: isNaN }
        ])) {
            response.status(400).json({ message: "Invalid params" });
            return;
        }
        // Deconstruct request body
        const { username, email, password } = request.body;
        // Create Token
        const token = new Token();
        token.hash = tokenHandler.generateToken(password);
        await dataSource.manager.save(token);
        // Create User
        const user = new User();
        user.username = username;
        user.tokenId = token.id;
        await dataSource.manager.save(user);
        // Create UserLogin
        const userLogin = new UserLogin();
        userLogin.email = email;
        userLogin.email = password;
        userLogin.userId = user.id;
        await dataSource.manager.save(userLogin);
        // Report
        response.status(200).json({
            message: "Login successfully created",
            data: { username: username },
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
        // Get User By Id
        let id: number = +request.params.id;
        const entity = await dataSource.getRepository(User).findOneBy({ id: id });
        // Return if no entity found
        if (entity === null) {
            response.status(204).json({ message: "No Record" });
            return;
        }
        response.status(200).json({ type: "User", data: entity });
    }

    async update(request: Request, response: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    async delete(request: Request, response: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }
}