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
    BaseRepository: Symbol.for('BaseRepository'),
    ApiKeyRepository: Symbol.for('ApiKeyRepository'),
    KeyRepository: Symbol.for('KeyRepository'),
    UserRepository: Symbol.for('UserRepository'),

    // Service
    AuthService: Symbol.for('AuthService'),
    KeyService: Symbol.for('KeyService'),
    TokenService: Symbol.for('TokenService'),

    // Model
    ApiKeyModel: Symbol.for('ApiKeyModel'),
    UserModel: Symbol.for('UserModel'),
    KeyModel: Symbol.for('KeyModel'),

    // Controller
    BaseController: Symbol.for('BaseController'),
    AuthController: Symbol.for('AuthController'),

    // Router
    IndexRouter: Symbol.for('IndexRouter'),
    AuthRouter: Symbol.for('AuthRouter')
}
