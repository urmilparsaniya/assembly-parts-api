import { NextFunction, Request, Response } from 'express';
import { CryptoUtil } from "../../common/utils/crypto-util";
import { BadRequestError, fetchEnvValue } from "../../common";


const REQUEST_ENCRYPTION_KEY_LENGTH: number = fetchEnvValue('REQUEST_ENCRYPTION_KEY_LENGTH', "int")
const REQUEST_ENCRYPTION_ENABLED: boolean = fetchEnvValue('REQUEST_ENCRYPTION_ENABLED', "boolean")

export async function decryptRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		if (REQUEST_ENCRYPTION_ENABLED && req.body) {
			const decryptText = (data: any): any => {
				if (data && data['secret_text']) {
					try {
						return CryptoUtil.decryptWithFirstNCharacterKey(REQUEST_ENCRYPTION_KEY_LENGTH, data['secret_text'])
					} catch (err) {
						throw new BadRequestError('Malformed UTF-8 data');
					}
				}
				return null;
			}
			const decryptStringData: string | null = await decryptText(req.body);
			req.body = decryptStringData ? JSON.parse(decryptStringData) : {};
			const decryptStringQuery: string = await decryptText(req.query);
			req.query = decryptStringQuery ? JSON.parse(decryptStringQuery) : {};
		}
		next();
	} catch (err: any) {
		next(err);
	}
}