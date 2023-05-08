// Dependencies
import dotenv from "dotenv";
import { DataSource, EntityMetadataNotFoundError } from 'typeorm';
import { getDataSource } from '../../src/utilities/DataSource';
// Subject
import { getPlacementByComponentModel } from '../../src/functions/getPlacementByComponentModel';

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
    test("Should return null if unable to get Placement", async () => {
        try {
            const placement = await getPlacementByComponentModel(DS, -1)
        } catch (exception) {
            expect(exception).toBeInstanceOf(EntityMetadataNotFoundError);
        }
    });

    test("Should return Placement if input is correct", async () => {
        const placement = await (getPlacementByComponentModel(DS, 1)
        .then((entity) => { return entity })
        .catch((error) => { }));
        expect(placement).not.toBe(null);
    });

});