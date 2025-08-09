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
import {
  ConflictError,
  RESPONSE_STRING,
  TableName,
  paginateList,
  throwIfNotFound,
} from "../../../common";
import { sequelize } from "../../../config/database";
import { CreationAttributes, IPartAttributes } from "./interface";
import { IFindAndCount, IListData, IRetrieveQuery } from "../../../../types";
import { CreatePartBody } from "../../../../types/rest/Parts";
import { AssembledPartComponent } from "../AssembledPartComponents";

export const initOptions: ModelOptions = {
  ...BaseInitOptions,
  tableName,
  modelName,
  name,
};

export class Part extends BaseModel<InferAttributes<Part>, CreationAttributes> {
  declare name: string;
  declare type: number; // 1: Assembled, 2: Raw
  declare stock_quantity: number;

  public static _list_attributes: string[] = this._base_list_attributes.concat([
    "id",
    "created_at",
  ]);
  public static filterable_attributes: string[] = [
    "id",
    "name",
    "type",
    "stock_quantity",
    "created_at",
  ];

  // Initialize
  public static initialize(db: any) {
    return this.init(Schema, {
      ...initOptions,
      sequelize,
    });
  }

  public static initAssociations(db: any): void {
    this.hasMany(
      db[TableName.ASSEMBLE_PART_COMPONENTS].AssembledPartComponent,
      {
        foreignKey: "assembled_part_id",
        as: "assembledParts",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }
    );
  }

  public static handleFilters(
    query: IRetrieveQuery,
    filters: FindOptions<IPartAttributes> = {},
    list: boolean = false
  ): FindOptions<IPartAttributes> {
    const options: FindOptions<IPartAttributes> = Part.parseFilters(
      query,
      list
    );
    options.where = { ...filters.where, ...options.where };
    return options;
  }

  public static async findByName(name: string): Promise<Part | null> {
    const module: Part | null = await this.findOne({
      where: { name },
    });
    return module;
  }

  public static async findById(id: string): Promise<Part> {
    const module: Part | null = await this.findOne({
      where: { id },
      include: [
        {
          model: AssembledPartComponent,
          as: "assembledParts",
          required: false,
          attributes: [
            "component_part_id",
            "quantity_required",
            "assembled_part_id",
          ],
        },
      ],
    });
    return throwIfNotFound(module, "Part not found");
  }

  public static async createParts(
    partsData: CreatePartBody,
    t?: Transaction
  ): Promise<Part> {
    const existingPart = await this.findByName(partsData.name);
    if (existingPart) {
      throw new ConflictError("Part with this name already exists");
    }
    const part = await this.create(partsData, { transaction: t });
    const createAssembledPart =
      await AssembledPartComponent.createAssembledPartComponent(
        partsData.parts,
        part,
        t
      );
    return this.findById(part.id);
  }

  public static async updateInventory(
    stock_quantity: number,
    partId: string,
    t?: Transaction
  ): Promise<Boolean> {
    await this.update({ stock_quantity }, {
      where: { id: partId },
    });
    return true;
  }
}
