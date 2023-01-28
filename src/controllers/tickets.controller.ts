import { Request, Response } from 'express';
import ticketRepository from '@/repositories/tickets-repository';
import { AuthenticatedRequest } from '@/middlewares';
import httpStatus from 'http-status';

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
    const enrollment = await ticketRepository.findEnrollmentByUserId(userId);
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    const ticket = await ticketRepository.findByEnrollmentId(enrollment.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    return res.status(200).json(ticket);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function createTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const enrollment = await ticketRepository.findEnrollmentByUserId(userId);
    if (!enrollment) {
      return res.sendStatus(httpStatus.NOT_FOUND)
    }
    const { ticketTypeId } = req.body;
    const ticketType = await ticketRepository.findTicketTypeById(ticketTypeId);
    if (!ticketType) {
      return res.status(httpStatus.BAD_REQUEST).send();
    }
    const ticket = await ticketRepository.create(ticketTypeId, enrollment.id);
    return res.status(httpStatus.CREATED).json(ticket);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }
}

export { getTicket, getTicketTypes, createTicket };
