import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicket, getTicketTypes } from '@/controllers';
import { createTicketSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/', getTicket)
  .get('/types', getTicketTypes)


export { ticketsRouter };
