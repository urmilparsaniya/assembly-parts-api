import {fetchEnvValue, isDevelopmentEnv} from "../utils";
import {ServerAction, StatusCode} from "../../../types";
import {NextFunction, Request, Response} from 'express';
import {CryptoUtil} from "../utils/crypto-util";
import {CharacterSet} from "../constants";

const REQUEST_ENCRYPTION_KEY_LENGTH: number = fetchEnvValue('REQUEST_ENCRYPTION_KEY_LENGTH', "int")
const REQUEST_ENCRYPTION_ENABLED: boolean = fetchEnvValue('REQUEST_ENCRYPTION_ENABLED', "boolean")

export class RouterUtils {
	public static async handleRestServerAction(
		handleMethod: (serverAction: ServerAction, req: Request, res: Response, next: NextFunction)
			=> Promise<void>,
		serverAction: ServerAction, req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			await handleMethod(serverAction, req, res, next);
		} catch (error) {
			next(error);
			isDevelopmentEnv();
		}
	}
}

export const encryptResponse = (data: [] | {} | undefined): any => {
	return CryptoUtil.encryptWithFirstNCharacterKey(
		REQUEST_ENCRYPTION_KEY_LENGTH, data,
		CharacterSet.ALPHANUMERIC_WITHOUT_SPECIAL_CHARACTER
	);
}

export const okResponse = function (serverAction: ServerAction, req: Request, res: Response,
                                    next: NextFunction, data: [] | {} | undefined, message: string = 'Success'): Response {
	const remoteIP: string = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress);
	// HttpReqLog.saveLogs(req.userId, serverAction, req.logs, remoteIP).then().catch();
	const response: Object = {
		status: true,
		message,
		data
	};
	if (REQUEST_ENCRYPTION_ENABLED) {
		return res.status(StatusCode.OK).contentType('text/plain').send(encryptResponse(response));
	}
	return res.status(StatusCode.OK).json(response);

};
