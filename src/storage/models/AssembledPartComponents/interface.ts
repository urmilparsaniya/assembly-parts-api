import { Optional } from 'sequelize';
import { IBaseAttributes } from '../BaseModel/interface';

export interface IAssembledPartComponentsAttributes extends IBaseAttributes {
	assembled_part_id: string;
	component_part_id: string;
	quantity_required: number;
}

export interface CreationAttributes
	extends Optional<IAssembledPartComponentsAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> { }
