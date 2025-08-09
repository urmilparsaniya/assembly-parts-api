import {ModuleSlug, PermissionSlug, RoleSlug, Status} from "../enums";
import {sequelize} from "../../config/database";
import {TableName} from "../constants";
import {throwIfNotFound} from "../utils";

const slugToReadable = (slug: string): string => {
	const words: string[] = slug.split('-');
	return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

async function checkDBConnection(): Promise<void> {
	try {
		// You can customize the query based on your database system
		const queryResult = await sequelize.query('SELECT 1', {raw: true});
		if (!queryResult) {
			console.error('Unable to connect to the database.');
			process.exit();
		}
	} catch (error) {
		console.error('Error checking database connection:', error);
		process.exit();
	}
}

async function requiredTables(tableNames: string[]): Promise<void> {
	try {
		// Check if each table exists
		for (const tableName of tableNames) {
			const tableExistsQuery: string = `
                SELECT table_name
                FROM information_schema.tables
                WHERE table_name = '${tableName}';
			`;

			const [result] = await sequelize.query(tableExistsQuery, {raw: true});

			if (!result || result.length === 0) {
				console.error(`Table ${tableName} does not exist.`)
				process.exit(1);
			}
		}
	} catch (error) {
		console.error('Error checking required tables:', error);
		process.exit();
	}
}

interface RoleModulePermissions {
	[k: string]: {
		[k: string]: PermissionSlug[]
	};
}

export class SyncModule {
}
