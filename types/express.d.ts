import {User} from "../src/storage/models/User/User";

declare global {
	namespace Express {
		export class Request {
			user?: User;
			userId?: string;
			roleId?: string;
			userEmail?: string;
			userRoleId?: string;
			logs: any[];
		}

		export interface Response {
		}
	}
}
