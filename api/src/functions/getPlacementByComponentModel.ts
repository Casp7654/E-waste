// DataSource
import { DataSource } from "typeorm";
// Entities
import { ComponentModel } from "../entities/ComponentModel";
import { Placement } from "../entities/Placement";
// Base Function
import { getComponent } from "./getComponent";

export const getPlacementByComponentModel = async (dataSource: DataSource, modelId: number): Promise<Placement | null> => {
    // set variables used to null
    let placement: Placement | null = null;
    let model: ComponentModel | null = null;
    // Check Model Id
    if (modelId <= 0) return placement;
    /// get Model
    model = await dataSource.getRepository(ComponentModel).findOneBy({ id: modelId });
    if (model === null) return placement;
    // Check if model has placement set
    if(model.placementId == null) return null;
    /// get Placement
    placement = await dataSource.getRepository(Placement).findOneBy({ id: model.placementId });
    if (model === null) return placement;
    // return result
    return placement;
}
