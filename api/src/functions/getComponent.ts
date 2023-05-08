// DataSource
import { DataSource } from "typeorm";
// Entities
import { ComponentModel } from "../entities/ComponentModel";
import { ComponentType } from "../entities/ComponentType";
import { ComponentUnit } from "../entities/ComponentUnit";
import { Placement } from "../entities/Placement";
// View Models
import { Component } from "../models/Component";

export const getComponent = async (dataSource: DataSource, unitId: number): Promise<Component | null> => {
    if (unitId <= 0) return null;
    const component: Component = {};

    /// get Componnet Unit
    const unit = await dataSource.getRepository(ComponentUnit).findOneBy({ id: unitId });
    if (unit === null) return null;
    component.id = unit.id;
    component.guid = unit.guid;
    component.weight = unit.weight;

    /// get Component Model
    const model = await dataSource.getRepository(ComponentModel).findOneBy({ id: unit.modelId });
    if (model === null) return component;
    component.model = model.title;

    /// get Component Type
    const type = await dataSource.getRepository(ComponentType).findOneBy({ id: model.typeId });
    if (type === null) return component;
    component.type = type.title;

    /// get Component Placement
    const placement = await dataSource.getRepository(Placement).findOneBy({ id: unit.placementId });
    if (placement === null) return component;
    component.placement = placement.title;
    
    return component;
}