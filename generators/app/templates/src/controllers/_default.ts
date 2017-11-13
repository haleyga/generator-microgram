import { Request, Response, Router } from 'express';
import { check, validationResult, ValidationChain } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import * as httpStatus from 'http-status-codes';

export const defaultRouter: Router = Router();


// DEFAULT ROUTE

const getDefaultValidations: ValidationChain[] = [];

export const getDefault = async (request: Request, response: Response) => {
    const errors: string[] = [];
    const message: {} = 'howdy!';

    response.status(httpStatus.OK).send({ message, errors });
};

defaultRouter.get('/', getDefaultValidations, getDefault);
