export class RegExpConstant {
	public static readonly REGEX_VALIDATION_LATITUDE: RegExp = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
	public static readonly REGEX_VALIDATION_LONGITUDE: RegExp = /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
}



export class CharacterSet {
	public static readonly ALPHABET: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	public static readonly NUMERIC: string = '0123456789';
	public static readonly ALPHANUMERIC_WITH_SPECIAL_CHARACTER: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=';
	public static readonly ALPHANUMERIC_WITHOUT_SPECIAL_CHARACTER: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
}