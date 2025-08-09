import {IFindAndCount, IPagination} from "../../../../types";
import {NotFoundError} from "../../errors";
import {NodeEnv} from "../../enums";


type CastEnvValue = "string" | "int" | "float" | "boolean";

export const fetchEnvValue = <T>(key: string, cast: CastEnvValue = 'string', isOptional: boolean = false): T => {
	const value: string | undefined = process.env[key];

	if (isBlank(value)) {
		console.error(`${key} key not defined in environment file.`);
		process.exit(1);
	}

	switch (cast) {
		case 'int':
			return parseInt(String(value), 10) as T;
		case 'float':
			return parseFloat(String(value)) as T;
		case 'boolean':
			return Boolean(value?.toLowerCase() == 'true') as T;
		default:
			return (value) as T;
	}
};

export const isDevelopmentEnv = (): boolean => {
	return [NodeEnv.DEVELOPMENT].includes(fetchEnvValue("NODE_ENV"));
};

export const isNull = (value: unknown): boolean => value === null || value === undefined;

export const notNull = (value: unknown): boolean => value !== null && value !== undefined;

export const isBlank = (str: string | undefined): boolean => isNull(str) || String(str).length < 1;

export const notBlank = (str: string | undefined): boolean => notNull(str) && String(str).length > 0;

export const isEmpty = (arr: any[]): boolean => isNull(arr) || arr.length < 1;

export const notEmpty = (arr: any[]): boolean => notNull(arr) && arr.length > 0;


export const paginateList = <T>(data: IFindAndCount<T>, page: number = 0, limit: number = 1000):
	IPagination<T> => {
	/**
	 * Add hasNextPage parameter
	 */
	const totalPages = Math.ceil(data.count / limit);
  	const hasNextPage = page < totalPages - 1;
	return {
		rows: data.rows,
		pagination: {
			count: data.count,
			limit,
			page,
			hasNextPage,
		},
	};
};

export const parseNum = (val: string): number | undefined => {
	const n: number = +val;
	if (isNaN(n)) return undefined;
	return n;
};


export const throwIfNotFound = <T>(record: T | null, message: string): T => {
	if (!record) {
		throw new NotFoundError(message);
	}
	return record;
};


export const getReadableKeyFromEnumValue = <T>(enumType: T, enumValue: number): string => {
	const enumString: string = (enumType as any)[enumValue].replace(/_/g, ' ').toLowerCase();
	return enumString.charAt(0).toUpperCase() + enumString.slice(1);
}