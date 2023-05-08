// Express Dependencies
import { Request, Response } from "express";
// TypeOrm Dependencies
import { DataSource } from "typeorm";
// Application Utilities
import RequestValidator from "../utilities/RequestValidator";
import TokenHandler from "../utilities/TokenHandler";
// Base Controller
import Controller from "./Controller";
// Entities
import { User } from "../entities/User";
import { Token } from "../entities/Token";
import { UserLogin } from "../entities/UserLogin";
import { StaticLogin } from "../entities/StaticLogin";

/**
 * Login Controller Used for authenticating
 */
export default class AuthController extends Controller {

    protected initialize(): void {
        this.addRoute('post', "/login", this.login);
        this.addRoute('post', "/login/static", this.loginStatic);
    }

    async index(request: Request, response: Response): Promise<void> {
        response.status(500).json({
            title: "Intended internal default server error",
            message: "Default error route reached!"
        });
        return;
    }

    async login(request: Request, response: Response): Promise<void> {
        // Get Application Utilities
        const dataSource: DataSource = request.app.get('dataSource');
        const requestValidator: RequestValidator = request.app.get('requestValidator');
        const tokenHandler: TokenHandler = request.app.get('tokenHandler');
        // Validate Parameters
        if (!requestValidator.validateKeys(request.body, [
            { key: "email", pass: isNaN },
            { key: "password", pass: isNaN }
        ])) {
            response.status(400).json({ message: "Invalid params" });
            return;
        }
        // Deconstruct request body
        const { email, password } = request.body;
        // get UserLogin
        const userLogin = await dataSource.getRepository(UserLogin).findOneBy({ email: email, password: password });
        if (userLogin === null) {
            response.status(204).json({ message: "No Record" });
            return;
        }
        // get User
        const user = await dataSource.getRepository(User).findOneBy({ id: userLogin.userId });
        if (user === null) {
            response.status(204).json({ message: "No User Entity Record for UserLogin" });
            return;
        }
        // get CurrenctToken
        let token = await dataSource.getRepository(Token).findOneBy({ id: user.tokenId });
        if (token === null) {
            // create new if none present
            token = new Token();
        }
        // Generate new token hash
        token.hash = tokenHandler.generateToken(userLogin.password);
        await dataSource.manager.save(token);
        // update UserToken Relation if changed
        user.tokenId = token.id;
        await dataSource.manager.save(user);
        // report Token
        response.status(200).json({ message: "Login success!", token: token });
        return;
    }

    async loginStatic(request: Request, response: Response): Promise<void> {
        // Get Application Utilities
        const dataSource: DataSource = request.app.get('dataSource');
        const requestValidator: RequestValidator = request.app.get('requestValidator');
        const tokenHandler: TokenHandler = request.app.get('tokenHandler');
        // Validate Parameters
        if (!requestValidator.validateKeys(request.body, [
            { key: "hash", pass: isNaN },
            { key: "secret", pass: isNaN }
        ])) {
            response.status(400).json({ message: "Invalid params" });
            return;
        }
        // Deconstruct request body
        const { hash, secret } = request.body;
        // get StaticLogin
        const staticLogin = await dataSource.getRepository(StaticLogin).findOneBy({ secret: secret });
        if (staticLogin === null) {
            response.status(204).json({ message: "No Record" });
            return;
        }
        // get CurrenctToken
        let token = await dataSource.getRepository(Token).findOneBy({ id: staticLogin.tokenId });
        if (token === null) {
            // create new if none present
            token = new Token();
        }
        // Generate new token hash
        token.hash = tokenHandler.generateToken(staticLogin.secret);
        await dataSource.manager.save(token);
        // update UserToken Relation if changed
        staticLogin.tokenId = token.id;
        await dataSource.manager.save(staticLogin);
        // report Token
        response.status(200).json({ message: "Login success!", token: token });
        return;
    }

}