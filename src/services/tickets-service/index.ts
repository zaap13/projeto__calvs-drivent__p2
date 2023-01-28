import { Request, Response } from 'express';
import ticketRepository from '@/repositories/tickets-repository';

async function getTicketTypes(req: Request, res: Response) {
  try {
    const ticketTypes = await ticketRepository.findAllTypes();
    res.status(200).json(ticketTypes);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}



export { getTicketTypes };






