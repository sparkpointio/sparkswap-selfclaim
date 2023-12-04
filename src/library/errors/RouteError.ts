import {getHttpStatus, HttpStatus} from "@/library/helpers/http.helper";

export class RouteError extends Error {
  status: HttpStatus = getHttpStatus('METHOD_NOT_ALLOWED');

  constructor(message?: string, options?: {
    status: HttpStatus
  }) {
    super(message?? 'Route Error');

    if (options && options.status) {
      this.status = options.status;
    }

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, RouteError.prototype);
  }

  getErrorMessage() {
    return 'Something went wrong: ' + this.message;
  }
}
