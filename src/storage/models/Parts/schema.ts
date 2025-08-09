import { Schema as BaseSchema } from '../BaseModel/schema';
import { DataTypes } from 'sequelize';

export const Schema = {
	...BaseSchema,
	name: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	type: {
		type: DataTypes.INTEGER,
		allowNull: false,
		comment: '1: Assembled, 2: Raw',
	},
	stock_quantity: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
		comment: 'Quantity of the part in stock',
	},
};
