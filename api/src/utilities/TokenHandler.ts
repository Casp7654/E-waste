// Dependencies
import { Hash, createHash } from "crypto";
import { DataSource } from "typeorm";

export default class TokenHandler {

    public get algorythm(): string {
        return this._algorythm;
    }

    constructor(
        protected _algorythm: string = "sha256"
    ) {

    }

    public generateToken(secret: string): string {
        let hash: Hash = createHash(this.algorythm);
        hash.update(secret);
        return hash.digest('hex');
    }

    public validateToken(inputHash: string) {
        // TODO:
        return inputHash !== undefined;
    }
}