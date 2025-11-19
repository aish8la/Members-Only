export class NotFoundError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean;

  constructor(message?: string) {
    super(message || "The resource you are trying to access does not exist.");
    this.statusCode = 404;
    this.isOperational = true;
    this.name = "NotFound";
  }
}

export class UnauthorizedError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean;

  constructor(message?: string) {
    super(message || "Authentication is required.");
    this.statusCode = 401;
    this.isOperational = true;
    this.name = "Unauthorized";
  }
}

export class ForbiddenError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean;

  constructor(message?: string) {
    super(message || "You do not have permission to access this resource.");
    this.statusCode = 403;
    this.isOperational = true;
    this.name = "Forbidden";
  }
}

export class BadRequestError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean;

  constructor(message?: string) {
    super(message || "Your request is malformed or invalid.");
    this.statusCode = 400;
    this.isOperational = true;
    this.name = "BadRequest";
  }
}
