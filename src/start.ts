require('dotenv').config();

import {db} from './storage';
import RestServer from './server/rest/RestServer';

class Bootstrap {
	private restHTTPServer: RestServer | undefined;

	public static async start(): Promise<void> {
		const instance: Bootstrap = new Bootstrap();

		// Initialize Storage module.
		await instance.initializeDB();

		// Starting HTTP Rest Server.
		instance.restHTTPServer = await instance.initializeHTTPRestServer();
	}

	private async initializeDB(): Promise<void> {
		db.sequelize.authenticate().catch((err: Error): void => {
			console.log('Sequelize error : ', err.message);
		});
	}

	private async initializeHTTPRestServer(): Promise<RestServer> {
		const restServer: RestServer = new RestServer();
		restServer.startServer();
		return restServer;
	}
}

Bootstrap.start().then();
