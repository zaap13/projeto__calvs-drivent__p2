import { Request, Response } from 'express';
import ticketRepository from '@/repositories/tickets-repository';
import { AuthenticatedRequest } from '@/middlewares';

async function getTicketTypes(req: Request, res: Response) {
  try {
    const ticketTypes = await ticketRepository.findAllTypes();
    res.status(200).json(ticketTypes);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;
    const ticket = await ticketRepository.findByUserId(userId);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    return res.status(200).json(ticket);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export { getTicket, getTicketTypes };
