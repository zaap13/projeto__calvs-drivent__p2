import { prisma } from '@/config';
import { Enrollment } from '@prisma/client';

async function findWithAddressByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  return prisma.enrollment.upsert({
    where: {
      userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
}

export type CreateEnrollmentParams = Omit<Enrollment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, 'userId'>;

const findEnrollmentById = async (id: number) => {
  try {
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        id,
      },
    });
    return enrollment;
  } catch (err) {
    throw new Error(`Failed to find enrollment by id: ${id}. Error: ${err}`);
  }
};

const enrollmentRepository = {
  findWithAddressByUserId,
  upsert,
  findEnrollmentById,
};

export default enrollmentRepository;
