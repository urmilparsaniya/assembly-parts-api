export default interface Schema {
	id: string;
	type: string;

	[properties: string]: unknown;
}
