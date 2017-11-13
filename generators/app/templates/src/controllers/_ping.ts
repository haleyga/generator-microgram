import { Request, Response, Router } from 'express';
import { check, validationResult, ValidationChain } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import * as httpStatus from 'http-status-codes';

export const pingRouter: Router = Router();


// PING

export const ping = (request: Request, response: Response) => {
    response.status(httpStatus.OK).send({ message: 'pong', errors: [] });
};

pingRouter.get('/', ping);
