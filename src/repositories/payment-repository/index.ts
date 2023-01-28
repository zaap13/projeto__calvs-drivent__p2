import { prisma } from '@/config';

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

const paymentRepository = {
  findPaymentByTicketId,
  findUserIdByTicketId,
};

export default paymentRepository;
