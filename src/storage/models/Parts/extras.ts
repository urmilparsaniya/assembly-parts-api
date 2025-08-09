import { ModelNameOptions } from 'sequelize';
import { TableName } from '../../../common';

export const modelName: string = 'Part';

export const name: ModelNameOptions = {
	singular: 'part',
	plural: 'parts',
};

export const tableName: string = TableName.PARTS;
