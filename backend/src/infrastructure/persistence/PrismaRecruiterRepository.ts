import { PrismaClient } from '@prisma/client';
import { Recruiter } from '../../domain/recruiter/Recruiter';
import { IRecruiterRepository } from '../../domain/recruiter/IRecruiterRepository';

export class PrismaRecruiterRepository implements IRecruiterRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Recruiter[]> {
    const recruiters = await this.prisma.recruiter.findMany({
      include: { candidates: true }
    });
    return recruiters.map(r => new Recruiter(r));
  }

  async findById(id: number): Promise<Recruiter | null> {
    const recruiter = await this.prisma.recruiter.findUnique({
      where: { id },
      include: { candidates: true }
    });
    return recruiter ? new Recruiter(recruiter) : null;
  }

  async create(recruiterData: Omit<Recruiter, 'id'>): Promise<Recruiter> {
    const recruiter = await this.prisma.recruiter.create({
      data: recruiterData,
      include: { candidates: true }
    });
    return new Recruiter(recruiter);
  }

  async update(id: number, recruiterData: Partial<Recruiter>): Promise<Recruiter> {
    const recruiter = await this.prisma.recruiter.update({
      where: { id },
      data: recruiterData,
      include: { candidates: true }
    });
    return new Recruiter(recruiter);
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
    return recruiter ? new Recruiter(recruiter) : null;
  }
} 