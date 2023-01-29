import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { paymentSchema } from '@/schemas';
import { getPaymentByTicketIdController, processNewPayment } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', getPaymentByTicketIdController)
  .post('/process', validateBody(paymentSchema), processNewPayment);

export { paymentsRouter };
