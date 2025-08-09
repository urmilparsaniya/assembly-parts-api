import {Includeable, Model, Op, ScopeOptions, WhereAttributeHash} from 'sequelize';
import {BaseModel} from '../../src/storage/models/BaseModel';
import {ParsedQs} from "qs";

export type IRetrieveQuery =
	Record<string, string | number | Array<string | object> | object> & ParsedQs | any;

export type IFindAndCount<T> = {
	rows: Array<T>;
	count: number;
};

export type IPagination<T> = {
	rows: Array<T>;
	pagination: {
		count: number;
		page: number;
		limit: number;
		sort?: string | Array<[string, 'ASC' | 'DESC']>;
		hasNextPage: boolean;
	};
};

export type IListData<T> = IFindAndCount<T> | IPagination<T>;

export type IScope<M extends BaseModel> =
	string
	| ScopeOptions
	| readonly (string | ScopeOptions)[]
	| WhereAttributeHash<M>;


export type GenericAttributes = {
	[key: string]: any;
};

export type GenericModel<T extends {}> = Model<T>;

export type FilterCondition = {
	[key: string]: string | number | boolean | { [Op.like]: string } | {
		[Op.between]: [number, number]
	};
};

export interface GetAllDataOptions {
	page?: number;
	pageSize?: number;
	filters?: FilterCondition;
	search?: string;
	include?: Includeable[];
	sort?: string | Array<[string, 'ASC' | 'DESC']>; // Updated sorting option
}
