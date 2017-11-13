import { Request, Response, Router } from 'express';
import { check, validationResult, ValidationChain } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import * as httpStatus from 'http-status-codes';

export const metaRouter: Router = Router();


// META

const getMetaInformationValidations: ValidationChain[] = [];

export const getMetaInformation = (request: Request, response: Response) => {
    response.status(httpStatus.NOT_FOUND).send({ message: 'unknown', errors: [] });
};

metaRouter.get('/', getMetaInformationValidations, getMetaInformation);
