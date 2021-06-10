export class BaseError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = new.target.name;
  }
}

export class BadRequestError extends BaseError {}

export class UnauthorizedError extends BaseError {}

export class NotFoundError extends BaseError {}

export class InternalServerError extends BaseError {}
