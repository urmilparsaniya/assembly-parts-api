import {Sequelize} from 'sequelize';
import {Dialect} from 'sequelize/types/sequelize';

const DB_NAME: string | undefined = process.env.DB_NAME;
const DB_USER: string | undefined = process.env.DB_USER;
const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;
const DB_PORT: number = Number(process.env.DB_PORT);
const DB_HOST: string | undefined = process.env.DB_HOST;
const DB_DIALECT: string | undefined = process.env.DB_DIALECT;


if (!DB_HOST || !DB_USER || !DB_NAME || !DB_PORT || !DB_DIALECT) {
	console.error('Stopping the service. Details: Invalid DB parameters. Please ensure correct parameters.');
	process.exit(1);
}

const connection: Sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	port: DB_PORT,
	host: DB_HOST,
	dialect: DB_DIALECT as Dialect,
	logging: false,
	pool: {
		min: 0,
		max: 5,
		acquire: 30000,
		idle: 10000,
	},
});
connection
	.authenticate()
	.then(() => {
		console.log(`DB CONNECTION SUCCESS: ${DB_NAME}\n`);
	})
	.catch((error: any) => {
		console.error('DB CONNECTION ERROR: ', error);
	});

export {connection as sequelize, Sequelize};
