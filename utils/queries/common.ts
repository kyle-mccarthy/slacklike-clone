export class NotAuthenticatedError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class HttpError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
  }
}
