exports.STATUS_CODES = {
    // 2XX SUCCESS
    SUCCESS             : 200,
    CREATED             : 201,
    NO_CONTENT          : 204,

    // 4XX CLIENT ERROR
    BAD_REQUEST             : 400,
    UNAUTHORIZED            : 401,
    FORBIDDEN               : 403,
    NOT_FOUND               : 404,
    REQUEST_TIMEOUT         : 408,
    CONFLICT                : 409,
    PRECONDITION_FAILED     : 412,
    TOO_MANY_REQUESTS       : 429,

    // 5XX SERVER ERROR
    SERVER_ERROR        : 500,
    BAD_GATEWAY         : 502,
    SERVICE_UNAVAILABLE : 503,
    GATEWAY_TIMEOUT     : 504,
    BANDWIDTH_LIMIT_EXCEEDED    : 509
}