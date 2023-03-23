import { Response, NextFunction } from "express";
import { Request } from '../core/interfaces/contracts';
import { Header } from "../constants";
import { UnauthorizedException } from "../core/exceptions";
import { ITokenService } from "../core/interfaces/services";

export default class RequestHandlerMiddleware {
    private readonly _tokenService: ITokenService;

    constructor(tokenService: ITokenService) {
        this._tokenService = tokenService;
    }

    invoke = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userId = req.headers[Header.CLIENT_ID];

        if (typeof userId !== 'string' || userId === undefined || !userId) {
            throw new UnauthorizedException({
                message: 'Invalid Request!',
                errors: ['User Id not found.']
            });
        }

        const accessToken = req.headers[Header.ACCESS_TOKEN];

        if (typeof accessToken !== 'string' || accessToken === undefined || !accessToken) {
            throw new UnauthorizedException({
                message: 'Invalid Request!',
                errors: ['Access Token not found.']
            });
        }

        const refreshToken = req.headers[Header.REFRESH_TOKEN];

        if (typeof refreshToken !== 'string' || refreshToken === undefined || !refreshToken) {
            throw new UnauthorizedException({
                message: 'Invalid Request!',
                errors: ['Refresh Token not found.']
            });
        }

        try {
            let authRequest = await this._tokenService.verifyAccessToken(userId, accessToken);
            authRequest = await this._tokenService.verifyRefreshToken(userId, refreshToken);

            req.authentication = authRequest;
            req.authentication.accessToken = accessToken;
            req.authentication.refreshToken = refreshToken;
        } catch (error: any) {
            console.log(error.message);

            throw new UnauthorizedException({
                message: 'Invalid Request!',
                errors: [error.message]
            });
        }

        return next();
    }
}
