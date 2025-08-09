import express, { Request, Response } from 'express';

import * as swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { decryptRequest } from "../../../../middlewares/dycrypt-request";
import PartsRouter from './api/Parts';

export default class GlobalRouterV1 {
	private readonly router: express.Router;

	public constructor() {
		this.router = express.Router();
	}

	public buildRoutes(): express.Router {
		this.buildRandomRouteAPI();
		this.buildRouteAPI();
		return this.router;
	}

	protected buildRouteAPI(): void {
		this.router.use('/api', [
			new PartsRouter().buildRoutes(),
		]);
	}

	protected buildRandomRouteAPI(): void {
	}
}
