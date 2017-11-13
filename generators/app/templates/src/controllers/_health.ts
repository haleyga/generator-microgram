import { Request, Response, Router } from 'express';
import { check, validationResult, ValidationChain } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import * as httpStatus from 'http-status-codes';

export const healthRouter: Router = Router();


// SERVICE HEALTH

const getServiceHealthValidations: ValidationChain[] = [];

export const getServiceHealth = async (request: Request, response: Response) => {
    response.status(httpStatus.NOT_FOUND).send({ message: 'unknown', errors: [] });
};

healthRouter.get('/', getServiceHealthValidations, getServiceHealth);
