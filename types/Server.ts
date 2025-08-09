export enum ServerAction {
	// Self User
	USER_ACCOUNT_LOGIN = 'UserAccountLogin',
	USER_ACCOUNT_REGISTER = 'UserAccountRegister',
	USER_ACCOUNT_REFRESH_TOKEN = 'UserAccountRefreshToken',
	USER_ACCOUNT_FORGOT_PASSWORD = 'UserAccountForgotPassword',
	USER_ACCOUNT_RESET_PASSWORD = 'UserAccountResetPassword',
	USER_ACCOUNT_UPDATE = 'UserAccountUpdate',
	USER_ACCOUNT_DELETE_CONFIRMATION = 'UserAccountDeleteConfirmation',
	USER_ACCOUNT_DELETE = 'UserAccountDelete',
	USER_ACCOUNT_PERMISSION_GET = 'UserAccountPermissionGet',

	//Other user
	USER_LIST = 'UserList',
	USER_CREATE = 'UserCreate',
	USER_GET = 'UserGet',
	USER_UPDATE = 'UserUpdate',
	USER_DELETE = 'UserDelete',

	COUNTRY_LIST = 'CountryList',
	COUNTRY_CREATE = 'CountryCreate',
	COUNTRY_GET = 'CountryGet',
	COUNTRY_UPDATE = 'CountryUpdate',
	COUNTRY_DELETE = 'CountryDelete',
	COUNTRY_HIERARCHY = 'CountryHierarchy ',

	TERRITORY_LIST = 'TerritoryList',
	TERRITORY_CREATE = 'TerritoryCreate',
	TERRITORY_GET = 'TerritoryGet',
	TERRITORY_UPDATE = 'TerritoryUpdate',
	TERRITORY_DELETE = 'TerritoryDelete',

	ROLE_LIST = 'RoleList',
	ROLE_CREATE = 'RoleCreate',
	ROLE_GET = 'RoleGet',
	ROLE_UPDATE = 'RoleUpdate',
	ROLE_DELETE = 'RoleDelete',
	ROLE_LIST_USERS_COUNT = 'RolesUsersCount',
	ROLE_PERMISSION_TABLE = 'RolesPermissionsTable',


	PERMISSION_LIST = 'PermissionList',
	PERMISSION_CREATE = 'PermissionCreate',
	PERMISSION_GET = 'PermissionGet',
	PERMISSION_UPDATE = 'PermissionUpdate',
	PERMISSION_DELETE = 'PermissionDelete',

	ROLE_PERMISSION_CREATE = 'RolePermissionCreate',
	ROLE_PERMISSION_UPDATE = 'RolePermissionUpdate',
	ROLE_PERMISSION_DELETE = 'RolePermissionDelete',

	DEPARTMENT_LIST = 'DepartmentList',
	DEPARTMENT_CREATE = 'DepartmentCreate',
	DEPARTMENT_GET = 'DepartmentGet',
	DEPARTMENT_UPDATE = 'DepartmentUpdate',
	DEPARTMENT_DELETE = 'DepartmentDelete',

	EMAIL_TEMPLATE_LIST = 'EmailTemplateList',
	EMAIL_TEMPLATE_CREATE = 'EmailTemplateCreate',
	EMAIL_TEMPLATE_GET = 'EmailTemplateGet',
	EMAIL_TEMPLATE_UPDATE = 'EmailTemplateUpdate',
	EMAIL_TEMPLATE_DELETE = 'EmailTemplateDelete',

	// 	EmailTemplateComponent
	EMAIL_TEMPLATE_COMPONENT_LIST = 'EmailTemplateComponentList',
	EMAIL_TEMPLATE_COMPONENT_CREATE = 'EmailTemplateComponentCreate',
	EMAIL_TEMPLATE_COMPONENT_GET = 'EmailTemplateComponentGet',
	EMAIL_TEMPLATE_COMPONENT_UPDATE = 'EmailTemplateComponentUpdate',
	EMAIL_TEMPLATE_COMPONENT_DELETE = 'EmailTemplateComponentDelete',

	INTERNAL_CRYPTO_ENCRYPT_DATA = 'InternalCryptoEncryptData',
	INTERNAL_CRYPTO_DECRYPT_DATA = 'InternalCryptoDecryptData',

	// CMS
	CMS_LIST = 'cmsList',
	CMS_DETAIL_BY_SLUG = 'cmsDetailBySlug',
	CREATE_CMS = 'CreateCms',
	UPDATE_CMS = 'UpdateCms',
	UPDATE_CMS_STATUS = 'UpdateCmsStatus',
	DELETE_CMS = 'DeleteCms',

	// AUDIT
	AUDIT_LIST = 'auditList',

	// Notification
	NOTIFICATION_LIST = 'NotificationList',
	NOTIFICATION_REMOVE = 'NotificationRemove',


}

// REST Server Routes / API Endpoints
export enum RESTServerRoute {
	PARTS = 'parts/create',
	PARTS_DETAILS = 'parts/details/:id',
	ADD_PART_TO_INVENTORY = 'parts/:id'
}


export enum StatusCode {
	OK = 200,
	Created = 201,
	Accepted = 202,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	Conflict = 409,
	UnprocessableEntity = 422,
	InternalServerError = 500,
}