/*
* Table name must be singular
* Main table start word must be tbl_
* */
export class TableName {
	public static readonly PARTS: string = "tbl_parts";
	public static readonly ASSEMBLE_PART_COMPONENTS: string = "tbl_assemble_part_components";
}

/*
* Table index name must be tbl_<table_name>_<column_name>__<index_name>
* Index name can be like uk : unique key, fk : foreign key, pk : primary key
* */
export class TableIndexName {
}