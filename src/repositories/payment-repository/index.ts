import { prisma } from '@/config';
import { CardData } from '@/services/payments-service';

async function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function findUserIdByTicketId(ticketId: number) {
  const ticket = await prisma.ticket.findFirst({
    where: { id: ticketId },
  });
  if (!ticket) {
    return null;
  }
  const enrollment = await prisma.enrollment.findFirst({
    where: { id: ticket.enrollmentId },
  });
  if (!enrollment) {
    return null;
  }
  return enrollment.userId;
}

async function createPayment(ticketId: number, cardData: CardData) {
  const { issuer, number } = cardData;

  const lastDigits = number.toString().slice(-4);

  const payment = await prisma.payment.create({
    data: {
      Ticket: {
        connect: { id: ticketId },
      },
      value: 0,
      cardIssuer: issuer,
      cardLastDigits: lastDigits,
    },
  });

  await prisma.ticket.update({
    where: { id: ticketId },
    data: { status: 'PAID' },
  });

  return payment;
}

const paymentRepository = {
  findPaymentByTicketId,
  findUserIdByTicketId,
  createPayment,
};

export default paymentRepository;
