import HttpError from './HttpError';

class Conflict extends HttpError {
  constructor(message: string) {
    const statusCode = 409;
    super(message, statusCode);
  }
}

export default Conflict;
