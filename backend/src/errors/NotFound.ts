import HttpError from './HttpError';

class NotFound extends HttpError {
  constructor(message: string) {
    const statusCode = 404;
    super(message, statusCode);
  }
}

export default NotFound;
