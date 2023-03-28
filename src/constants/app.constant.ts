export const Role = {
    ADMIN: 'Admin',
    MODERATOR: 'Moderator',
    BASIC: 'Basic'
};

export const Header = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    ACCESS_TOKEN: 'x-access-token',
    REFRESH_TOKEN: 'x-refresh-token'
};

export const Locator = {
    // DB
    MONGO_DB: Symbol('MongoDb'),

    // Repository
    BASE_REPOSITORY: Symbol('BaseRepository'),
    APIKEY_REPOSITORY: Symbol('ApiKeyRepository'),
    KEY_REPOSITORY: Symbol('KeyRepository'),
    ROLE_REPOSITORY: Symbol('RoleRepository'),
    ROLECLAIM_REPOSITORY: Symbol('RoleClaimRepository'),
    USER_REPOSITORY: Symbol('UserRepository'),

    // Service
    AUTH_SERVICE: Symbol('AuthService'),
    KEY_SERVICE: Symbol('KeyService'),
    TOKEN_SERVICE: Symbol('TokenService'),
    ROLE_SERVICE: Symbol('RoleService'),
    ROLECLAIM_SERVICE: Symbol('RoleClaimService'),
    USER_SERVICE: Symbol('UserService'),

    // Model
    APIKEY_MODEL: Symbol('ApiKeyModel'),
    ROLE_MODEL: Symbol('RoleModel'),
    ROLECLAIM_MODEL: Symbol('RoleClaimModel'),
    USER_MODEL: Symbol('UserModel'),
    KEY_MODEL: Symbol('KeyModel'),

    // Controller
    BASE_CONTROLLER: Symbol('BaseController'),
    EXAMPLE_CONTROLLER: Symbol('ExampleController'),
    AUTH_CONTROLLER: Symbol('AuthController'),

    // Router
    INDEX_ROUTER: Symbol('IndexRouter'),
    AUTH_ROUTER: Symbol('AuthRouter')
}

export const StatusCode = {
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTI_STATUS: 207,
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    MOVED_TEMPORARILY: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,

    /**
     * @deprecated
     *
     * Was defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy. It has been deprecated due to security concerns regarding in-band configuration of a proxy.
     */
    USE_PROXY: 305,

    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    REQUEST_TOO_LONG: 413,
    REQUEST_URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    REQUESTED_RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    IM_A_TEAPOT: 418,
    INSUFFICIENT_SPACE_ON_RESOURCE: 419,

    /**
     * @deprecated
     *
     * A deprecated response used by the Spring Framework when a method has failed.
     */
    METHOD_FAILURE: 420,

    MISDIRECTED_REQUEST: 421,
    UNPROCESSABLE_ENTITY: 422,
    LOCKED: 423,
    FAILED_DEPENDENCY: 424,
    PRECONDITION_REQUIRED: 428,
    TOO_MANY_REQUESTS: 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
    UNAVAILABLE_FOR_LEGAL_REASONS: 451,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    INSUFFICIENT_STORAGE: 507,
    NETWORK_AUTHENTICATION_REQUIRED: 511
}

export const AuthType = {
    SIGN_IN: 'SignIn',
    SIGN_UP: 'SignUp'
}

export const DefaultImage = {
    MALE_AVATAR: 'https://res.cloudinary.com/dglgzh0aj/image/upload/v1638705521/TGProV3/users/default/default_male_photo.jpg',
    MALE_AVATAR_ID: 'TGProV3/users/default/default_male_photo',
    FEMALE_AVATAR: 'https://res.cloudinary.com/dglgzh0aj/image/upload/v1637290486/TGProV3/users/default/default_female_photo.jpg',
    FEMALE_AVATAR_ID: 'TGProV3/users/default/default_female_photo'
}
