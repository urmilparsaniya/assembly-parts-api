import { ModelNameOptions } from 'sequelize';
import { TableName } from '../../../common';

export const modelName: string = 'AssembledPartComponent';

export const name: ModelNameOptions = {
	singular: 'assembled_part_component',
	plural: 'assembled_part_components',
};

export const tableName: string = TableName.ASSEMBLE_PART_COMPONENTS;
