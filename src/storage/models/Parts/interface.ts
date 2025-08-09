import { Optional } from 'sequelize';
import { IBaseAttributes } from '../BaseModel/interface';

export interface IPartAttributes extends IBaseAttributes {
	name: string;
	type: number; // 1: Assembled, 2: Raw
	stock_quantity: number;
}

export interface CreationAttributes
	extends Optional<IPartAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> { }
