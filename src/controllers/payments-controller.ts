import { Response } from 'express';
import { getPaymentByTicketId } from '@/services/payments-service';
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
