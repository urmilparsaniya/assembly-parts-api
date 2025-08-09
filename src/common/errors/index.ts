import {StatusCode} from '../../../types';

export class AppError extends Error {
	statusCode: number;
	errors?: unknown | undefined;


	constructor(message: string, statusCode: StatusCode = StatusCode.InternalServerError, errors?: unknown | undefined) {
		super(message);
		this.name = this.constructor.name;
		this.statusCode = statusCode;
		this.errors = errors;
	}
}

export class BadRequestError extends AppError {
	constructor(message: string = 'Bad Request') {
		super(message, StatusCode.BadRequest);
	}
}

export class UnauthorizedError extends AppError {
	constructor(message: string = 'Unauthorized') {
		super(message, StatusCode.Unauthorized);
	}
}

export class ForbiddenError extends AppError {
	constructor(message: string = 'Forbidden') {
		super(message, StatusCode.Forbidden);
	}
}

export class NotFoundError extends AppError {
	constructor(message: string = 'Not Found') {
		super(message, StatusCode.NotFound);
	}
}

export class ConflictError extends AppError {
	constructor(message: string = 'Conflict') {
		super(message, StatusCode.Conflict);
	}
}

export class ValidationError extends AppError {
	constructor(message: string = 'Validation Error', errors?: unknown | undefined) {
		super(message, StatusCode.UnprocessableEntity, errors);
	}
}

export class UnprocessableEntityError extends AppError {
	constructor(message: string = 'Unprocessable Entity') {
		super(message, StatusCode.UnprocessableEntity);
	}
}

export class EmailSendingError extends AppError {
	constructor(message: string = 'Failed to send email') {
		super(message, StatusCode.InternalServerError);
	}
}

export class InternalServerError extends AppError {
	constructor(message: string = 'Internal Server Error') {
		super(message, StatusCode.InternalServerError);
	}
}


