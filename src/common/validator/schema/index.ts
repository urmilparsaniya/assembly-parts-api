import Ajv, {Options, ValidateFunction} from "ajv";
import Schema from "../../../../types/validator/Schema";
import addFormats from "ajv-formats";
import * as fs from "fs";
import keywords from "ajv-keywords";
import * as path from "path";
import {ValidationError} from "../../errors";
import {RegExpConstant} from "../../constants";


const defaultOptions: Options = {
	strict: false,
	allErrors: true,
	removeAdditional: "failing",
	allowUnionTypes: true,
	useDefaults: true,
	coerceTypes: false,
	verbose: true,
};

export class SchemaValidator {
	private static commonSchema: Schema = JSON.parse(fs.readFileSync(path.join(__dirname,
		"../../../assets/server/schemas/common/common.json"
	), "utf8"));
	protected moduleName: string;
	private readonly ajv: Ajv;

	protected constructor(moduleName: string, config: Options = defaultOptions) {
		this.moduleName = moduleName;
		this.ajv = new Ajv(config);

		keywords(this.ajv);
		addFormats(this.ajv);

		this.addCustomKeywords();

		this.addCustomFormatters();

		this.ajv.addSchema([SchemaValidator.commonSchema]);
		this.ajv.addKeyword("notEmpty", {
			validate: function (schema: any, data: any) {
				return typeof data === "string" && data.trim() !== "";
			},
			keyword: "",
		});
	}

	protected validate = (schema: Schema, data: any, cloneObj = false): any => {
		let validateFunction: ValidateFunction | undefined;
		if (!schema.$id) {
			validateFunction = this.ajv.compile(schema);
		} else {
			validateFunction = this.ajv.getSchema(schema["$id"] as string);
			if (!validateFunction) {
				this.ajv.addSchema(schema);

				validateFunction = this.ajv.getSchema(schema["$id"] as string);
			}
		}

		// Run validation
		if (validateFunction && !validateFunction(data)) {
			if (!validateFunction.errors) {
				validateFunction.errors = [];
			}
			const concatenatedErrors: string[] = [];
			const fieldErrors: object[] = [];
			for (const validationError of validateFunction.errors) {
				if (
					validationError.instancePath &&
					validationError.instancePath !== ""
				) {
					concatenatedErrors.push(
						`'${validationError?.parentSchema?.term}': ${validationError.message}`
					);
				} else {
					// concatenatedErrors.push(`Error: ${validationError.message}`);
					if (validationError.message != null) {
						concatenatedErrors.push(validationError.message);
					}
				}
				fieldErrors.push({
					type: validationError?.parentSchema?.type,
					field: validationError?.parentSchema?.field,
					term: validationError?.parentSchema?.term,
					examples: validationError?.parentSchema?.examples,
					provided: validationError?.data,
					message: validationError?.message,
				});
			}

			// Throw errors here...
			throw new ValidationError(concatenatedErrors.join(', '), fieldErrors);
		}
		return data;
	};

	private addCustomFormatters = (): void => {
		// Add custom formats
		this.ajv.addFormat("latitude", {
			type: "number",
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			validate: (c) => RegExpConstant.REGEX_VALIDATION_LATITUDE.test(c.toString()),
		});
		this.ajv.addFormat("longitude", {
			type: "number",
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			validate: (c) => RegExpConstant.REGEX_VALIDATION_LONGITUDE.test(c.toString()),
		});
	};

	private addCustomKeywords = (): void => {
	};
}
