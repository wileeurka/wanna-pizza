class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
  }

  static UnauthorizedError(message = "Unauthorized") {
    return new ApiError(401, message);
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
}

module.exports = ApiError;
