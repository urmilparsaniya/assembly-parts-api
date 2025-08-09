import { SchemaValidator } from "../../../../../common";
import { CreatePartBody } from "../../../../../../types/rest/Parts";
import fs from "fs";
import Schema from "../../../../../../types/validator/Schema";
import path from "path";

const MODULE_NAME = "PartsReqVal";

export class PartsReqVal extends SchemaValidator {
  private static instance: PartsReqVal;

  private createPartsBody: Schema = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../../../../assets/server/schemas/rest/v1/Parts/Create/body.json"), "utf8")
  );

  private constructor() {
    super(MODULE_NAME);
  }

  public validateCreatePartBody(body: Object): CreatePartBody {
    return this.validate(this.createPartsBody, body);
  }

  public static getInstance = () => {
    if (!PartsReqVal.instance) {
      PartsReqVal.instance = new PartsReqVal();
    }
    return PartsReqVal.instance;
  };
}
