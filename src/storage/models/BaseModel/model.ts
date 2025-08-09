import {CreationOptional, FindOptions, Model, ModelOptions, Op} from 'sequelize';
import {IRetrieveQuery} from '../../../../types';


export const BaseInitOptions: ModelOptions = {
	freezeTableName: true,
	underscored: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	deletedAt: 'deleted_at',
	paranoid: true,
	defaultScope: {
		where: {
			/**
			 * If we use MySql then need to comment out below line of code
			 * because this is not support to my sql 
			 * Support postgresql
			 */
			deleted_at: null
		},
		attributes: {exclude: ['deleted_at']}
	},
};

export class BaseModel<
	TModelAttributes extends {} = any,
	TCreationAttributes extends {} = TModelAttributes
> extends Model<TModelAttributes, TCreationAttributes> {
	public static _base_list_attributes: string[] = [
		'id',
		'created_at',
		'updated_at',
	];
	public static sensitive_attributes: Array<string> = [];
	declare id: CreationOptional<string>;
	declare created_at: CreationOptional<Date>;
	declare updated_at: CreationOptional<Date>;
	declare deleted_at: CreationOptional<Date>;
	public static filterable_attributes: Array<string> = [];

	public static initialize(db: any): void {
	}

	public static initAssociations(db: any): void {
	}

	public static initializeScope(db: any): void {
	}

	public static initializeHooks(db: any): void {
	}

	public static parseFilters(query: IRetrieveQuery, list: boolean = false): FindOptions {
		const filters: FindOptions & { where: { [k: string]: any } } = {where: {}} as FindOptions & { where: {} };
		try {
			Object.keys(query).forEach((key: string): void => {
				if (key === 'sort') filters.order = this.parseSorting(query.sort);
				if (key === 'attributes') filters.attributes = this.parseAttributes(query.attributes);
				if (list) {
					/**
					 * Fixed pagination issue
					 */
					if (key === 'page') filters.offset = +query.size * +query.page;
					else if (key === 'size') {
						filters.limit = +query.size;
					} else if (query[key]) {
						if (key.includes('__in')) {
							const base_key: string = key.replace('__in', '');
							if (this.filterable_attributes.includes(base_key)) {
								filters.where[base_key] = {[Op.in]: query[key].split('|'),};
							}
						} else if (key.includes('__con')) {
							const base_key: string = key.replace('__con', '');
							if (this.filterable_attributes.includes(base_key)) {
								filters.where[base_key] = {[Op.like]: `%${query[key]}%`,};
							}
						} else if (key.includes('__sw')) {
							const base_key: string = key.replace('__sw', '');
							if (this.filterable_attributes.includes(base_key)) {
								filters.where[base_key] = {[Op.startsWith]: query[key],};
							}
						} else if (key.includes('__ew')) {
							const base_key: string = key.replace('__ew', '');
							if (this.filterable_attributes.includes(base_key)) {
								filters.where[base_key] = {[Op.endsWith]: query[key],};
							}
						} else if (key.includes('__is')) {
							const base_key: string = key.replace('__is', '');
							if (this.filterable_attributes.includes(base_key)) filters.where[base_key] = query[key];
						} else if (key.includes('__notin')) {
							/**
							 * In some projects, it might be filtering like getting a list of data without particular data. 
							 * In this method call
							 */
							const base_key: string = key.replace('__notin', '');
							if (this.filterable_attributes.includes(base_key)) {
								filters.where[base_key] = { [Op.ne]: query[key].split('|') };
							}
						}
					}
				}
			});
			const isStatusCol: boolean = 'deleted_at' in this.getAttributes();
			if (isStatusCol) filters.where['deleted_at'] = null;
		} catch (err: any) {
			console.log('Error (Parse Filters): ', err);
		}
		return filters;
	}

	private static parseSorting(query: string | number | Array<string | object> | object): Array<[string, string]> {
		const parsed: Array<[string, string]> = [];
		let parameters: Array<string> = [];
		if (typeof query === 'string') {
			parameters = query.split('|');
		} else if (Array.isArray(query)) {
			parameters = query as Array<string>;
		} else return [['id', 'DESC']];
		parameters.map((item: string): void => {
			const itemData: [string, string] = item.at(-1) === '-' ? [item.slice(0, -1), 'DESC'] : [item, 'ASC'];
			if (this.filterable_attributes.includes(itemData[0]) && ['ASC', 'DESC'].includes(itemData[1])) {
				parsed.push(itemData);
			}
		});
		return parsed.length ? parsed : [['id', 'DESC']];
	}

	private static parseAttributes(query: string | number | Array<string | object> | object): Array<string> {
		let attributes: Array<string> = [];
		if (typeof query === 'string') {
			attributes = query.split('|');
		} else if (Array.isArray(query)) {
			attributes = query as Array<string>;
		} else return [];
		return attributes;
	}

	/**
	 * Method 2
	 * For nested modules filtering
	*/
	public static generateIncludeWhereClause(queryData: any, filterableIncludeAttributes: any) {
        let whereClause = {};
        const includedAttributes = Object.keys(queryData)
            .map((key) => {
                const [fieldName, operator] = key.split('__');
                return { fieldName, operator };
            })
            .filter(({ fieldName }) => filterableIncludeAttributes.includes(fieldName));

        if (includedAttributes.length > 0) {
            whereClause = {
                [Op.and]: includedAttributes
                    .map(({ fieldName, operator }) => {
                        const value = queryData[`${fieldName}__${operator}`];
                        switch (operator) {
                            case 'is':
                                return { [fieldName]: { [Op.eq]: value } };
                            case 'in':
                                return { [fieldName]: { [Op.in]: value.split('|') } };
                            case 'con':
                                return {
                                    [fieldName]: {
                                        [Op.like]: `%${value}%`,
                                    },
                                };

                            default:
                                return null;
                        }
                    })
                    .filter((condition) => condition !== null),
            };
        }
        return whereClause;
    }

	public sanitize() {
	}
}
