import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findAllTypes() {
    return prisma.ticketType.findMany();
}

async function findByEnrollmentId(enrollmentId: number) {
    return prisma.ticket.findFirst({
        where: { enrollmentId },
        include: { TicketType: true },
    });
}

async function create(data: Prisma.TicketCreateInput) {
    return prisma.ticket.create({
        data,
    });
}

const ticketRepository = {
    findAllTypes,
    findByEnrollmentId,
    create,
};

export default ticketRepository;
