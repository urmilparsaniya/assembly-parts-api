import express, { NextFunction, Request, Response } from "express";
import { RESTServerRoute, ServerAction } from "../../../../../../../types";
import { RouterUtils } from "../../../../../../common";
import PartsController from "../../../Controllers/Parts";

export default class PartsRouter {
  private readonly router: express.Router;

  public constructor() {
    this.router = express.Router();
  }

  public buildRoutes(): express.Router {
    this.buildRouteParts();
    this.buildRoutePartDetails();
    this.buildRouteAddPartToInventory();
    return this.router;
  }

  // Create Parts API
  private buildRouteParts(): void {
    this.router.post(
      `/${RESTServerRoute.PARTS}`,
      (req: Request, res: Response, next: NextFunction): void => {
        void RouterUtils.handleRestServerAction(
          PartsController.parts.bind(this),
          ServerAction.NOTIFICATION_LIST,
          req,
          res,
          next
        );
      }
    );
  }

  // Get Part Details API
  private buildRoutePartDetails(): void {
    this.router.get(
      `/${RESTServerRoute.PARTS_DETAILS}`,
      (req: Request, res: Response, next: NextFunction): void => {
        void RouterUtils.handleRestServerAction(
          PartsController.partDetails.bind(this),
          ServerAction.NOTIFICATION_LIST,
          req,
          res,
          next
        );
      }
    );
  }

  // Add Part to inventory
  private buildRouteAddPartToInventory(): void {
    this.router.put(
      `/${RESTServerRoute.ADD_PART_TO_INVENTORY}`,
      (req: Request, res: Response, next: NextFunction): void => {
        void RouterUtils.handleRestServerAction(
          PartsController.addPartToInventory.bind(this),
          ServerAction.NOTIFICATION_LIST,
          req,
          res,
          next
        );
      }
    );
  }
}
