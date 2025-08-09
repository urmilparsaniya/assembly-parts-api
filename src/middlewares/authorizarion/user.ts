import {
	ForbiddenError,
	isNull,
	JwtUtil,
	ModuleSlug,
	PermissionSlug,
	RESPONSE_STRING,
	RoleSlug,
	Status,
	UnauthorizedError
} from "../../common";
import {NextFunction, Request, Response} from "express";

const getBearerToken = (authHeader: string | undefined): string => {
	let bearerToken: string | undefined = authHeader;
	if (!bearerToken) {
		throw new UnauthorizedError(RESPONSE_STRING.VALIDATION.LOGIN.INVALID_TOKEN);
	}
	bearerToken = bearerToken?.split(" ")[1]; // because of 'Bearer' token
	return bearerToken;
};

export async function isAuthorizeUser(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		next();
	} catch (err: any) {
		next(err);
	}
}

export function checkPermission(module: ModuleSlug, permission: PermissionSlug):
	(req: Request, res: Response, next: NextFunction) => Promise<void> {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			next();
		} catch (err) {
			next(err);
		}
	};
}