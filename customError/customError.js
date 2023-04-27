function CustomError(message) {
    this.constructor.prototype.__proto__=Error.prototype
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = this.constructor.message;
}

throw new CustomError("test Error")