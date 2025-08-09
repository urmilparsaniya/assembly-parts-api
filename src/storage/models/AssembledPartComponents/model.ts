import {
  CountOptions,
  FindOptions,
  InferAttributes,
  ModelOptions,
  Transaction,
} from "sequelize";
import { modelName, name, tableName } from "./extras";
import { Schema } from "./schema";
import { BaseInitOptions, BaseModel } from "../BaseModel";
import { ConflictError, RESPONSE_STRING, TableName, paginateList } from "../../../common";
import { sequelize } from "../../../config/database";
import {
  CreationAttributes,
  IAssembledPartComponentsAttributes,
} from "./interface";
import { IFindAndCount, IListData, IRetrieveQuery } from "../../../../types";
import { CreatePartBody } from "../../../../types/rest/Parts";
import { Part } from "../Parts";

export const initOptions: ModelOptions = {
  ...BaseInitOptions,
  tableName,
  modelName,
  name,
};

export class AssembledPartComponent extends BaseModel<
  InferAttributes<AssembledPartComponent>,
  CreationAttributes
> {
  declare assembled_part_id: string;
  declare component_part_id: string;
  declare quantity_required: number;

  public static _list_attributes: string[] = this._base_list_attributes.concat([
    "id",
    "created_at",
  ]);
  public static filterable_attributes: string[] = [
    "id",
    "assembled_part_id",
    "component_part_id",
    "quantity_required",
    "created_at",
    "updated_at",
  ];

  // Initialize
  public static initialize(db: any) {
    return this.init(Schema, {
      ...initOptions,
      sequelize,
    });
  }

  public static initAssociations(db: any): void {
    this.belongsTo(db[TableName.PARTS].Part, {
      foreignKey: "assembled_part_id",
      as: "assembledPart",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    this.belongsTo(db[TableName.PARTS].Part, {
      foreignKey: "component_part_id",
      as: "componentPart",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }

  public static handleFilters(
    query: IRetrieveQuery,
    filters: FindOptions<IAssembledPartComponentsAttributes> = {},
    list: boolean = false
  ): FindOptions<IAssembledPartComponentsAttributes> {
    const options: FindOptions<IAssembledPartComponentsAttributes> =
      AssembledPartComponent.parseFilters(query, list);
    options.where = { ...filters.where, ...options.where };
    return options;
  }

  public static async createAssembledPartComponent(
    componentParts: { component_part_id: string; quantity: number }[],
    part: Part,
    t?: Transaction
  ): Promise<any> {
    if (part.type !== 1) {
      return; // Only assembled parts can have components
    }
    if (!Array.isArray(componentParts) || componentParts.length === 0) {
      throw new Error("Assembled part must have at least one component");
    }
    for (const comp of componentParts) {
      const existingComponent = await Part.findByPk(comp.component_part_id);
      if (!existingComponent) {
        throw new Error(
          `Component part with ID ${comp.component_part_id} does not exist`
        );
      }
    }

    // Prepare rows for bulk insert
    const rows = componentParts.map((comp) => ({
      assembled_part_id: part.id,
      component_part_id: comp.component_part_id,
      quantity_required: comp.quantity,
    }));

    // Insert into assembled_part_components table
    await AssembledPartComponent.bulkCreate(rows, { transaction: t });
    return rows;
  }
}
