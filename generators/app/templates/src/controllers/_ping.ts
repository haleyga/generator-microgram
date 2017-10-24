import { Request, Response, Router } from 'express';
import { check, validationResult, ValidationChain } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import { HttpStatus } from '../config/http-status-codes';

export const pingRouter: Router = Router();


// PING

export const ping = (request: Request, response: Response) => {
    response.status(HttpStatus.Ok).send({ message: 'pong', errors: [] });
};

pingRouter.get('/', ping);
