import fs from 'fs';
import path from 'path';
import {isDevelopmentEnv, TableName} from "../common";
import {Sequelize, sequelize} from '../config/database';

export const db: any = {};

/*
 *  PROPER ORDERING IS REQUIRED FOR BELOW TABLE
 * */
const order: Array<string> = [
	TableName.PARTS,
	TableName.ASSEMBLE_PART_COMPONENTS,
];

const exclude: Array<string> = ['BaseModel', __filename, 'migrations', 'config', 'seeders'];

const isFile = (fileName: string): boolean => fs.lstatSync(fileName).isFile();
const isDir = (Path: string): boolean => fs.lstatSync(Path).isDirectory();

const getFolders = (folderPath: string): Array<string> =>
	fs
		.readdirSync(folderPath)
		.map((fileName) => path.join(folderPath, fileName))
		.filter(isDir);

const getModels = (basedir: string): void => {
	/**
	 * Here I remove isDevelopmentEnv() 
	 * It is the reason why when we change server at that time cause an issue
	 */
	const model_base_path = path.join(basedir, 'model.ts');
	if (!exclude.includes(path.basename(basedir))) {
		try {
			const model = require(model_base_path);
			db[model.initOptions.tableName] = model;
		} catch (err) {
		}
		const results = getFolders(basedir);
		if (results.length > 0) {
			results.map((item, index) => getModels(item));
		}
	}
};

getModels(__dirname);

order.forEach((model: string, index: number) => {
	if (db[model].initOptions) {
		db[model][db[model].initOptions.modelName].initialize(db);
	}
});

order.forEach((model: string, index: number) => {
	if (db[model].initOptions) {
		db[model][db[model].initOptions.modelName].initAssociations(db);
	}
});

order.forEach((model: string, index: number) => {
	if (db[model].initOptions) {
		db[model][db[model].initOptions.modelName].initializeScope(db);
	}
});

order.forEach((model: string, index: number) => {
	if (db[model].initOptions) {
		db[model][db[model].initOptions.modelName].initializeHooks(db);
	}
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
