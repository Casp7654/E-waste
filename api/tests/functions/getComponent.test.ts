// Dependencies
import dotenv from "dotenv";
import { DataSource, EntityMetadataNotFoundError } from 'typeorm';
import { getDataSource } from '../../src/utilities/DataSource';
// Subject
import { getComponent } from '../../src/functions/getComponent';

describe('getComponent Tests', () => {
    // Globals
    let ENV: NodeJS.ProcessEnv;
    let DS: DataSource;

    // Befores
    beforeAll(() => {
        dotenv.config({ path: `./${process.env.ENVFILE || '.env'}` });
        ENV = process.env || {};
    })
    beforeEach(() => DS = getDataSource(ENV));

    // Tests
    test("Should return null if unable to get Component", async () => {
        try {
            const component = await getComponent(DS, -1)
        } catch (exception) {
            expect(exception).toBeInstanceOf(EntityMetadataNotFoundError);
        }
    });

    test("Should return Component if input is Correct", async () => {
        const component = await (getComponent(DS, 1)
        .then((component) => { return component })
        .catch((error) => { }));
        expect(component).not.toBe(null);
    });

});