import express, {NextFunction, Request, Response} from "express";
import {RESTServerRoute, ServerAction} from "../../../../../../../types";
import { RouterUtils } from "../../../../../../common";
import AssembledPartComponentsController from "../../../Controllers/AssembledPartComponents";

export default class AssembledPartComponentsRouter {
    private readonly router: express.Router;

    public constructor() {
        this.router = express.Router();
    }

    public buildRoutes(): express.Router {
        return this.router;
    }
}