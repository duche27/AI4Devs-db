import { PrismaClient, Recruiter as PrismaRecruiter } from '@prisma/client';
import { Recruiter } from '../../domain/recruiter/Recruiter';
import { IRecruiterRepository } from '../../domain/recruiter/IRecruiterRepository';

export class PrismaRecruiterRepository implements IRecruiterRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Recruiter[]> {
    const recruiters = await this.prisma.recruiter.findMany({
      include: { candidates: true }
    });
    return recruiters.map(this.mapToDomain);
  }

  async findById(id: number): Promise<Recruiter | null> {
    const recruiter = await this.prisma.recruiter.findUnique({
      where: { id },
      include: { candidates: true }
    });
    return recruiter ? this.mapToDomain(recruiter) : null;
  }

  async create(recruiterData: Omit<Recruiter, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recruiter> {
    const recruiter = await this.prisma.recruiter.create({
      data: {
        firstName: recruiterData.firstName,
        lastName: recruiterData.lastName,
        email: recruiterData.email,
        phone: recruiterData.phone,
        department: recruiterData.department,
        isActive: recruiterData.isActive
      },
      include: { candidates: true }
    });
    return this.mapToDomain(recruiter);
  }

  async update(id: number, recruiterData: Partial<Omit<Recruiter, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Recruiter> {
    const recruiter = await this.prisma.recruiter.update({
      where: { id },
      data: {
        firstName: recruiterData.firstName,
        lastName: recruiterData.lastName,
        email: recruiterData.email,
        phone: recruiterData.phone,
        department: recruiterData.department,
        isActive: recruiterData.isActive
      },
      include: { candidates: true }
    });
    return this.mapToDomain(recruiter);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.recruiter.delete({
      where: { id }
    });
  }

  async findByEmail(email: string): Promise<Recruiter | null> {
    const recruiter = await this.prisma.recruiter.findUnique({
      where: { email },
      include: { candidates: true }
    });
    return recruiter ? this.mapToDomain(recruiter) : null;
  }

  private mapToDomain(prismaRecruiter: PrismaRecruiter & { candidates?: any[] }): Recruiter {
    const recruiter = new Recruiter({
      firstName: prismaRecruiter.firstName,
      lastName: prismaRecruiter.lastName,
      email: prismaRecruiter.email,
      phone: prismaRecruiter.phone || undefined,
      department: prismaRecruiter.department || undefined,
      isActive: prismaRecruiter.isActive,
      candidates: prismaRecruiter.candidates || []
    });
    
    // Set the id after construction since it's omitted from the constructor
    (recruiter as any).id = prismaRecruiter.id;
    (recruiter as any).createdAt = prismaRecruiter.createdAt;
    (recruiter as any).updatedAt = prismaRecruiter.updatedAt;
    
    return recruiter;
  }
} 