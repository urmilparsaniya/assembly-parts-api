import { Schema as BaseSchema } from '../BaseModel/schema';
import { DataTypes } from 'sequelize';

export const Schema = {
	...BaseSchema,
	assembled_part_id: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	component_part_id: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	quantity_required: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 1,
		comment: 'Quantity of the component part required for the assembled part',
	},
};
