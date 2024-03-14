import { toast } from "react-toastify";
import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit"; 

enum HttpErrorCode {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  RequestTimeout = 408,
  Conflict = 409,
  TooManyRequests = 429,
  InternalServerError = 500,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
}

type HttpErrorMessage = Record<HttpErrorCode, string>;

const DEFAULT_MESSAGES: HttpErrorMessage = {
  [HttpErrorCode.BadRequest]:
    "Bad Request. The server cannot or will not process the request due to an apparent client error",
  [HttpErrorCode.Unauthorized]:
    "Unauthorized. Authentication is required and has failed or has not yet been provided",
  [HttpErrorCode.Forbidden]:
    "Forbidden. User not having the necessary allPermissions for a resource",
  [HttpErrorCode.NotFound]:
    "Not Found. The server cannot find the requested resource",
  [HttpErrorCode.RequestTimeout]:
    "Request Timeout. The server timed out waiting for the request",
  [HttpErrorCode.Conflict]: "Conflict",
  [HttpErrorCode.TooManyRequests]: "Too Many Requests",
  [HttpErrorCode.InternalServerError]: "Internal error occurred",
  [HttpErrorCode.BadGateway]:
    "Bad Gateway. Invalid response from the upstream server",
  [HttpErrorCode.ServiceUnavailable]:
    "Service Unavailable. The server cannot handle the request (because it is overloaded or down for maintenance)",
  [HttpErrorCode.GatewayTimeout]:
    "Service Unavailable. The server cannot handle the request",
};

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const responseErrorMessage = Array.isArray(action?.payload?.data?.message)
      ? null
      : action?.payload?.data?.message;
    toast.error(
      responseErrorMessage ??
        DEFAULT_MESSAGES[action?.payload?.status as HttpErrorCode] ??
        "Виникла невідома помилка"
    );
  }

  next(action);
};
