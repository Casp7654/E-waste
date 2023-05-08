// DataSource
import { DataSource } from "typeorm";
// Entities
import { ComponentUnit } from "../entities/ComponentUnit";
// View Models
import { Component } from "../models/Component";
// Base Function
import { getComponent } from "./getComponent";

export const getComponentsByPlacement = async (dataSource: DataSource, placementId: number): Promise<Component[] | null> => {
    if (placementId <= 0) return null;
    const components: Component[] = [];

    /// get Componnet Unit
    const units = await dataSource.getRepository(ComponentUnit).findBy({ placementId: placementId });
    if (units === undefined) return null;

    for (const unit of units) {
        const component = await getComponent(dataSource, unit.id);
        if (component === null) continue;
        components.push(component);
    }

    return components;
}
