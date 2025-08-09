import express, {Application, NextFunction, Request, Response} from 'express';
import cors from 'cors';
import morgan, {TokenIndexer} from 'morgan';
import {createServer, Server as HTTPServer} from 'http';
import GlobalRouterV1 from './v1/Routes/GlobalRouterV1';
import helmet from 'helmet';
import sanitize from 'express-sanitizer';
import useragent from 'express-useragent';
import hpp from 'hpp';
import {AppError, encryptResponse, fetchEnvValue, isDevelopmentEnv, SyncModule} from "../../common";
import {StatusCode} from '../../../types';
import * as middleware from 'i18next-http-middleware';
import i18next from 'i18next';
import backend from 'i18next-fs-backend';
import path from 'path';

const REQUEST_ENCRYPTION_ENABLED: boolean = fetchEnvValue('REQUEST_ENCRYPTION_ENABLED', "boolean")

export default class RestServer {
	private readonly expressApplication: Application;
	private readonly restHTTPServer: HTTPServer;

	public constructor() {
		this.expressApplication = express();
		this.restHTTPServer = createServer(this.expressApplication);

		this.setMiddlewares();
		this.config();
		this.setRoutes();
		this.setCustomRouteHandlers();
	}

	public getExpressApplication = (): Application => this.expressApplication;

	public getRestHTTPServer = (): HTTPServer => this.restHTTPServer;

	public startServer(): HTTPServer {
		const PORT: string | number = process.env.REST_HTTP_SERVICE_PORT || 9000;
		this.restHTTPServer.listen(PORT, () => {
			console.log(
				`\nNODE_ENV : ${process.env.NODE_ENV}\n\nNODE APPLICATION IS RUNNING ON PORT ${PORT}`
			);
		});
		return this.getRestHTTPServer();
	}

	private config(): void {
	}

	private setMiddlewares(debug = false): void {
		// Secure the application
		this.expressApplication.use(helmet());
		// Cross-origin headers
		this.expressApplication.use(cors());

		/**
		 * User agent middleware
		 * @see https://www.npmjs.com/package/express-useragent
		 */
		this.expressApplication.use(useragent.express());

		if (debug || isDevelopmentEnv()) {
			this.expressApplication.use(
				morgan(
					(tokens: TokenIndexer<Request, Response>, req: Request, res: Response): string => {
						return [tokens.method(req, res), `${tokens.req(req, res, 'host')}${tokens.url(req, res)}`,
							'-', tokens.status(req, res), '-', tokens['response-time'](req, res) + 'ms', '-',
							Number(tokens.res(req, res, 'content-length')) / 1024 + 'Kb'].join(' ');
					}
				)
			);
		}
		// Mount express-sanitizer middleware
		this.expressApplication.use(sanitize());
		this.expressApplication.use(hpp());

		this.expressApplication.use(express.json());
		this.expressApplication.use(express.urlencoded({extended: true}));

		i18next
			.use(backend)
			.use(middleware.LanguageDetector)
			.init({
				fallbackLng: 'en',
				preload: ['en'],
				backend: {
					loadPath: path.join(__dirname, '../../assets/locales/{{lng}}.json'),
				},
			}).then();
		this.expressApplication.use(middleware.handle(i18next));
		this.expressApplication.use((req: Request, res: Response, next: NextFunction) => {
			req.logs = [];
			next();
		});
	}

	private setRoutes(): void {
		this.expressApplication.use(
			`/v1`,
			new GlobalRouterV1().buildRoutes()
		);
	}

	private setCustomRouteHandlers(): void {
		this.expressApplication.use((err: AppError, req: Request, res: Response, next: NextFunction): Response => {
			console.log(err);
			const response: Object = {
				message: err?.message,
				status: false,
				errors: err?.errors
			};
			if (REQUEST_ENCRYPTION_ENABLED) {
				return res.status(err?.statusCode ?? StatusCode.InternalServerError).contentType('text/plain').send(encryptResponse(response));
			}
			return res.status(err?.statusCode ?? StatusCode.InternalServerError).json(response);
		});
	}
}
