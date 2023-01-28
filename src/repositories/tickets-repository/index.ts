import { prisma } from '@/config';

async function findAllTypes() {
  return prisma.ticketType.findMany();
}

async function findByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: { TicketType: true },
  });
}

async function findEnrollmentByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
  });
}

async function create(ticketTypeId: number, enrollmentId: number) {
  const ticket = await prisma.ticket.create({
    data: {
      status: 'RESERVED',
      TicketType: {
        connect: {
          id: ticketTypeId,
        },
      },
      Enrollment: {
        connect: {
          id: enrollmentId,
        },
      },
    },
    include: {
      TicketType: true,
    },
  });
  return ticket;
}

async function findTicketTypeById(id: number) {
  return prisma.ticketType.findFirst({ where: { id } });
}

async function findByUserId(userId: number) {
  const session = await prisma.session.findFirst({
    where: {
      userId,
    },
  });
  if (!session) {
    throw new Error('User not found or inactive');
  }
  const enrollment = await prisma.enrollment.findFirst({
    where: { userId },
  });
  if (!enrollment) {
    throw new Error('Enrollment not found');
  }
  const ticket = await prisma.ticket.findFirst({
    where: { enrollmentId: enrollment.id },
  });
  if (!ticket) {
    throw new Error('Ticket not found');
  }
  return ticket;
}

const findTicketById = async (id: number) => {
  try {
    const ticket = await prisma.ticket.findFirst({
      where: {
        id,
      },
    });
    return ticket;
  } catch (err) {
    throw new Error(`Failed to find ticket by id: ${id}. Error: ${err}`);
  }
};

const ticketRepository = {
  findAllTypes,
  findByEnrollmentId,
  create,
  findByUserId,
  findEnrollmentByUserId,
  findTicketTypeById,
  findTicketById,
};

export default ticketRepository;
