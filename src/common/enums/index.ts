export enum NodeEnv {
	DEVELOPMENT = "development",
	PRODUCTION = "production",
	TEST = "test",
}

export enum Status {
	INACTIVE = 0,
	ACTIVE = 1
}

export enum PermissionSlug {
	CREATE = "create",
	READ = "read",
	UPDATE = "update",
	DELETE = "delete",
}

export enum ModuleSlug {
	USERS = "users",
	WAREHOUSE_MANAGEMENT = "warehouse-management",
	DEPARTMENT = "department",
	SHIFT = "shift",
	STORE = "store",
	ASSIGN_STORE_WAREHOUSE_MANAGEMENT = "assign-store-warehouse-management",
	FEATURES_MANAGEMENT = "features-management",
	CATEGORY = "category",
	SUB_CATEGORY = "sub-category",
	NESTED_CATEGORY = "nested-category",
	PRODUCT = "product",
	PROMOTION_DATA = "promotion-data",
	BRAND = "brand",
	PURCHASE_ORDER = "purchase-order",
	COUNTRY = "country",
	TERRITORY = "territory",
	CITY = "city",
	ROLE = "role",
	MODULE = "module",
	PERMISSION = "permission",
	ROLE_PERMISSION = "role-permission",
	EMAIL_TEMPLATE = "email-template",
	EMAIL_TEMPLATE_COMPONENT = "email-template-component",
}

export enum RoleSlug {
	SUPER_ADMIN = "super-admin",
	SUB_ADMIN = "sub-admin",
	RETAIL_SUPER_ADMIN = "retail-super-admin",
	BUYER_ADMIN = "buyer-admin",
	TERRITORY_MANAGER = "territory-manager",
	STORE_MANAGER = "store-manager",
	WAREHOUSE_MANAGER = "warehouse-manager",
	CREDIT_CONTROLLER = "credit-controller",
	MAINTENANCE_MANAGER = "maintenance-manager",
	DEMAND_PLANNING_MANAGER = "demand-planning-manager",
	STOCK_INVENTORY_MANAGER = "stock-inventory-manager",
	BUYER = "buyer",
	CASHIER = "cashier",
	AUDITOR = "auditor",
	SUPPLIER = "supplier",
	TECHNICIAN = "technician",
	CUSTOMERS = "customers",
	ACCOUNT_USER = "account-user",
	OTHER = "other"
}

export enum EmailTemplateComponentType {
	STYLE = 0,
	HEADER = 1,
	FOOTER = 2,
	MAIN_CONTENT = 3,
}

export enum AuditTrailOperationType {
	INSERT = "INSERT",
	UPDATE = "UPDATE",
	DELETE = "DELETE"
}

export enum NotificationStatus {
	READ = "READ",
	UNREAD = "UNREAD",
}