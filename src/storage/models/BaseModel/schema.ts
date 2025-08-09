import {DataTypes} from 'sequelize';


export const Schema = {
	id: {
		allowNull: false,
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4
	},
	created_at: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
	},
	updated_at: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
	},
	deleted_at: {
		type: DataTypes.DATE,
		allowNull: true
	}
};
