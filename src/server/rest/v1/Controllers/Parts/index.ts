import { NextFunction, Request, Response } from "express";
import { IRetrieveQuery, ServerAction } from "../../../../../../types";
import {
  ConflictError,
  NotificationStatus,
  RESPONSE_STRING,
  okResponse,
} from "../../../../../common";
import { CreatePartBody } from "../../../../../../types/rest/Parts";
import { PartsReqVal } from "../../Validators/Part";
import { Part } from "../../../../../storage/models/Parts";
const { sequelize } = require("../../../../../config/database");

export default class PartsController {
  static async parts(
    serverAction: ServerAction,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    let t = await sequelize.transaction();
    const body: CreatePartBody =
      PartsReqVal.getInstance().validateCreatePartBody(req.body);
    let createParts = await Part.createParts(body, t);
    await t.commit();
    okResponse(
      serverAction,
      req,
      res,
      next,
      createParts,
      req.t("parts.create.success")
    );
  }

  static async partDetails(
    serverAction: ServerAction,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const query: IRetrieveQuery = req.query as IRetrieveQuery;
    const partId = req.params.id;
    const partDetails = await Part.findById(partId);
    okResponse(
      serverAction,
      req,
      res,
      next,
      partDetails,
      req.t("parts.details.success")
    );
  }

  static async addPartToInventory(
    serverAction: ServerAction,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const partId = req.params.id;
    const quantity = req.body.quantity as number;
    if (!quantity) {
      throw new ConflictError(
        "Quantity is required to add part to inventory",
      );
    }
    let t = await sequelize.transaction();
    const part = await Part.findById(partId);
    await Part.updateInventory(quantity, partId, t);
    part.stock_quantity = quantity;
    await t.commit();
    okResponse(
      serverAction,
      req,
      res,
      next,
      { part },
      req.t("parts.add_to_inventory.success")
    );
  }
}
