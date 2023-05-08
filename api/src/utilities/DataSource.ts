// Dependencies
import "reflect-metadata"
import { DataSource } from 'typeorm';
import { isNumberObject } from "util/types";

// Entities
import { ComponentUnit } from "../entities/ComponentUnit";
import { ComponentModel } from "../entities/ComponentModel";
import { ComponentType } from "../entities/ComponentType";
import { User } from '../entities/User';
import { UserLogin } from "../entities/UserLogin";
import { Token } from "../entities/Token";
import { StaticLogin } from "../entities/StaticLogin";
import { Placement } from "../entities/Placement";
import { TestDefinition } from "../entities/TestDefinition";
import { TestResult } from "../entities/TestResult";
import { RecycleValue } from "../entities/RecycleValue";
import { RecycleMaterial } from "../entities/RecycleMaterial";

// Setup Database
export const getDataSource = (env: NodeJS.ProcessEnv): DataSource => new DataSource({
    type: 'mariadb',
    host: env.DB_HOST || 'localhost',
    port: (isNumberObject(env.DB_PORT) ? env.DB_PORT : 3306) as number,
    username: env.DB_USER || 'root',
    password: env.DB_PASS || 'Supersecretdbp4ss',
    database: env.DB_NAME || 'regapp',
    synchronize: true,
    logging: (env.DB_LOGGING === "true") || false,
    entities: [
        UserLogin, Token, StaticLogin, // login
        User, // user
        ComponentUnit, ComponentModel, ComponentType, Placement, // registration
        RecycleMaterial, RecycleValue, // recyclability
        TestDefinition, TestResult // resellability
    ],
    migrations: [],
    subscribers: [],
});
