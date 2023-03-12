export const Role = {
    Admin: 'Admin',
    Moderator: 'Moderator',
    Basic: 'Basic'
};

export const Header = {
    ApiKey: 'x-api-key',
    Authorization: 'authorization'
};

export const Locator = {
    // Repository
    BaseRepository: Symbol('BaseRepository'),
    ApiKeyRepository: Symbol('ApiKeyRepository'),
    KeyRepository: Symbol('KeyRepository'),
    UserRepository: Symbol('UserRepository'),

    // Service
    AuthService: Symbol('AuthService'),
    KeyService: Symbol('KeyService'),
    TokenService: Symbol('TokenService'),

    // Model
    ApiKeyModel: Symbol('ApiKeyModel'),
    UserModel: Symbol('UserModel'),
    KeyModel: Symbol('KeyModel'),

    // Controller
    BaseController: Symbol('BaseController'),
    ExampleController: Symbol('ExampleController'),
    AuthController: Symbol('AuthController'),

    // Router
    IndexRouter: Symbol('IndexRouter'),
    AuthRouter: Symbol('AuthRouter')
}

export const StatusCode = {
    Ok: 200,
    Created: 201,
    NoContent: 204,
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    Conflict: 409,
    Unprocessable: 422,
    InternalServerError: 500
}
