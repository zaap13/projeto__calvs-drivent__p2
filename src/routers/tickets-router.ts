import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicket, getTicket, getTicketTypes } from '@/controllers';
import { createTicketSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/', getTicket)
  .get('/types', getTicketTypes)
  .post('/', validateBody(createTicketSchema), createTicket);

export { ticketsRouter };
