import Joi from 'joi';

export const createTicketSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().valid('BUG', 'FEATURE', 'ENHANCEMENT').required(),
});
