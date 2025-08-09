export const RESPONSE_STRING: any = {
	VALIDATION: {
		LOGIN: {
			INVALID_CREDENTIALS: 'Invalid credentials. Authentication failed.',
			INVALID_TOKEN: `Invalid token. Authentication failed.`,
			EXPIRED_TOKEN: `Token expired. Authentication failed.`,
		},
		ROLE: {
			NOT_FOUND: (id: any): string => `Role ${id} not found.`,
			SLUG_MUST_BE_UNIQUE: 'Role slug must be unique.'
		},
		TEMPLATE: {
			NOT_FOUND: (id: any): string => `Template ${id} not found.`,
			SLUG_MUST_BE_UNIQUE: 'Template slug must be unique.'
		},
		MODULE: {
			NOT_FOUND: (id: any): string => `Module ${id} not found.`,
			SLUG_MUST_BE_UNIQUE: 'Module slug must be unique.'
		},
		PERMISSION: {
			NOT_FOUND: (id: any): string => `Permission ${id} not found.`,
			SLUG_MUST_BE_UNIQUE: 'Permission slug must be unique.',
		},
		COUNTRY: {
			NOT_FOUND: (id: any): string => `Country ${id} not found.`,
			SLUG_MUST_BE_UNIQUE: 'Country slug must be unique.',
			CODE_MUST_BE_UNIQUE: 'Country code must be unique.'
		},
		TERRITORY: {
			NOT_FOUND: (id: any): string => `Territory ${id} not found.`,
			SLUG_MUST_BE_UNIQUE: 'Territory slug must be unique.',
			CODE_MUST_BE_UNIQUE: 'Territory code must be unique.'
		},
		CITY: {
			NOT_FOUND: (id: any): string => `City ${id} not found.`,
			SLUG_MUST_BE_UNIQUE: 'City slug must be unique.',
			CODE_MUST_BE_UNIQUE: 'City code must be unique.'
		},
		ROLE_PERMISSION: {
			NOT_FOUND: (id: any): string => `Role permission ${id ? id : ''} not found.`,
			ALREADY_EXISTS: 'Role permission already exists.'
		},
		USER: {
			NOT_FOUND: (id: any): string => `User ${id} not found.`,
			ALREADY_EXISTS: 'User already exists.',
			INCORRECT_EMAIL_OR_PASSWORD: 'Incorrect email or password. Authentication failed.',
			INACTIVE: 'Your account is inactive. Please contact support for assistance.',
			PERMISSION_DENIED: 'You do not have permission to access this resource.',
			EMAIL_NOT_VERIFIED: 'Please confirm your email address to activate your account.',
			PHONE_NOT_VERIFIED: 'Please confirm your phone number to activate your account.',
			USER_LIST: 'User list fetched successfully',
		},
		EMAIL: {
			TEMPLATE: {
				SLUG_MUST_BE_UNIQUE: 'Template slug must be unique.',
			},
			TEMPLATE_COMPONENT: {
				NOT_FOUND: (id: any): string => `Email template component ${id ? id : ''} not found.`,
				NOT_FOUND_TYPE: (componentName: string, id: any): string => `${componentName} ${id ? id : ''} not found.`,
				INACTIVE: (id: any): string => `Email template component ${id} is inactive.`,
				INVALID_CSS_CONTENT: 'Invalid CSS content.',
				INVALID_CSS_AT_LINE: (msg: string, atLine: any): string => `${msg} at line ${atLine}`,
			}
		},
		CMS: {
			CREATE: 'CMS added successfully',
			UPDATE: 'CMS updated successfully',
			STATUS_UPDATE: 'CMS status updated successfully',
			DELETE: 'CMS deleted successfully',
			LIST: 'CMS list fetched successfully',
			DETAILS_BY_ID: 'CMS Details fetched successfully',
			NOT_FOUND: (id: any): string => `CMS ${id} not found.`,
			CMS_KEY_EXISTS: 'CMS key already exists',
		},
		AUDIT: {
			LIST: 'Audit list fetched successfully',
		},
		NOTIFICATION: {
			LIST: 'Notification List fetched successfully',
			CLEAR: 'Notification Removed Successfully',
		},
	},

	SUCCESS: {
		DEPARTMENT: {
			CREATE: 'Department created successfully.',
			GET: 'Department retrieved successfully.',
			GET_ALL: 'Departments retrieved successfully.',
			UPDATE: 'Department updated successfully.',
			DELETE: 'Department deleted successfully.',
		},
	}
};



