import ticketRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentRepository from '@/repositories/payment-repository';
import httpStatus from 'http-status';

export async function getPaymentByTicketId(ticketId: number, userId: number) {
  if (!ticketId) {
    return { status: httpStatus.BAD_REQUEST, data: null };
  }
  try {
    const ticket = await ticketRepository.findTicketById(ticketId);
    if (!ticket) {
      return { status: httpStatus.NOT_FOUND, data: null };
    }
    const enrollment = await enrollmentRepository.findEnrollmentById(ticket.enrollmentId);
    if (!enrollment) {
      return { status: httpStatus.NOT_FOUND, data: null };
    }
    if (userId !== enrollment.userId) {
      return { status: httpStatus.UNAUTHORIZED, data: null };
    }
    const payment = await paymentRepository.findPaymentByTicketId(ticketId);
    if (!payment) {
      return { status: httpStatus.NOT_FOUND, data: null };
    }
    return { status: httpStatus.OK, data: payment };
  } catch (error) {
    return { status: httpStatus.INTERNAL_SERVER_ERROR, data: null };
  }
}
export interface CardData {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
}

export async function postNewPayment(ticketId: number, userId: number, cardData: CardData) {
  if (!ticketId) {
    return { status: httpStatus.BAD_REQUEST, data: null };
  }
  try {
    const ticket = await ticketRepository.findTicketById(ticketId);
    if (!ticket) {
      return { status: httpStatus.NOT_FOUND, data: null };
    }
    const enrollment = await enrollmentRepository.findEnrollmentById(ticket.enrollmentId);
    if (!enrollment) {
      return { status: httpStatus.NOT_FOUND, data: null };
    }
    if (userId !== enrollment.userId) {
      return { status: httpStatus.UNAUTHORIZED, data: null };
    }
    const payment = await paymentRepository.createPayment(ticketId, cardData);
    if (!payment) {
      return { status: httpStatus.NOT_FOUND, data: null };
    }
    return { status: httpStatus.OK, data: payment };
  } catch (error) {
    return { status: httpStatus.INTERNAL_SERVER_ERROR, data: null };
  }
}
