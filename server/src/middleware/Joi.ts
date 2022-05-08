import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import { ITodo } from "../models/Todo";
import Logging from "../library/Logging";

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      Logging.error(error);

      return res.status(422).json({ error });
    }
  };
}; 

export const Schemas = {
  todo: {
    create: Joi.object<ITodo>({
      title: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.number().required(),
      endDate: Joi.any().required(),
    }),
    update: Joi.object<ITodo>({
      title: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.number().required(),
      endDate: Joi.any().required(),
    }),
  },
};
