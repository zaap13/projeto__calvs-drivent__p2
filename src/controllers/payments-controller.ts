import { Response } from 'express';
import { getPaymentByTicketId, postNewPayment } from '@/services/payments-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getPaymentByTicketIdController(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  if (!ticketId) {
    return res.sendStatus(400);
  }
  try {
    const { status, data } = await getPaymentByTicketId(Number(ticketId), req.userId);
    return res.status(status).send(data);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function processNewPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId, cardData } = req.body;
  if (!ticketId) {
    return res.sendStatus(400);
  }
  try {
    const { status, data } = await postNewPayment(Number(ticketId), req.userId, cardData);
    return res.status(status).send(data);
  } catch (err) {
    return res.sendStatus(500);
  }
}
