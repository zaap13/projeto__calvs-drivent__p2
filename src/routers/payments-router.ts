import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { paymentSchema } from '@/schemas';
import { getPaymentByTicketIdController } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', getPaymentByTicketIdController)
  .post('/process', validateBody(paymentSchema));

export { paymentsRouter };
