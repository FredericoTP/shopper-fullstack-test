import HttpError from './HttpError';

class BadRequest extends HttpError {
  constructor(message: string) {
    const statusCode = 400;
    super(message, statusCode);
  }
}

export default BadRequest;
