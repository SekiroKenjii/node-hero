import { Response, NextFunction } from "express";
import { Request } from '../core/interfaces/contracts';
import { Header } from "../constants";
import { UnauthorizedException } from "../core/exceptions";
import { IKeyRepository } from "../core/interfaces/repositories";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Payload } from "../core/interfaces/contracts";

export class RequestHandler {
    private readonly _keyRepository: IKeyRepository;

    constructor(keyRepository: IKeyRepository) {
        this._keyRepository = keyRepository;
    }

    invoke = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userId = req.headers[Header.CLIENT_ID];

        if (typeof userId !== 'string' || userId === undefined || !userId) {
            throw new UnauthorizedException({
                message: 'Invalid Request!',
                errors: ['User Id not found.']
            });
        }

        const key = await this._keyRepository.findByUserId(userId);

        if (!key) {
            throw new UnauthorizedException({
                message: 'Invalid Request!',
                errors: ['User Key not found.']
            });
        }

        const accessToken = req.headers[Header.AUTHORIZATION];

        if (typeof accessToken !== 'string' || accessToken === undefined || !accessToken) {
            throw new UnauthorizedException({
                message: 'Invalid Request!',
                errors: ['Authentication header not found.']
            });
        }

        let decode: string | JwtPayload;

        try {
            decode = jwt.verify(accessToken, key.publicKey);
        } catch (error) {
            throw new UnauthorizedException({
                message: 'Invalid Request!',
                errors: ['Invalid Authentication header.']
            });
        }

        if (typeof decode === 'string' || decode === undefined || !decode) {
            throw new UnauthorizedException({
                message: 'Invalid Request!',
                errors: ['Invalid Authentication header.']
            });
        }

        const payload: Payload = decode as Payload;

        if (userId !== payload.userId) {
            throw new UnauthorizedException({
                message: 'Invalid Request!',
                errors: ['Invalid User Id.']
            });
        }

        req.userKey = {
            userId: key.user.toString(),
            publicKey: key.publicKey
        };

        return next();
    }
}
