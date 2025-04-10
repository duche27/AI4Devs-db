import { PrismaClient, Candidate as PrismaCandidate } from '@prisma/client';
import { Candidate } from '../../domain/candidate/Candidate';
import { ICandidateRepository } from '../../domain/candidate/ICandidateRepository';

export class PrismaCandidateRepository implements ICandidateRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Candidate[]> {
    const candidates = await this.prisma.candidate.findMany({
      include: { recruiter: true }
    });
    return candidates.map(this.mapToDomain);
  }

  async findById(id: number): Promise<Candidate | null> {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id },
      include: { recruiter: true }
    });
    return candidate ? this.mapToDomain(candidate) : null;
  }

  async create(candidateData: Omit<Candidate, 'id' | 'createdAt' | 'updatedAt'>): Promise<Candidate> {
    const candidate = await this.prisma.candidate.create({
      data: {
        firstName: candidateData.firstName,
        lastName: candidateData.lastName,
        email: candidateData.email,
        phone: candidateData.phone,
        address: candidateData.address,
        status: candidateData.status,
        position: candidateData.position,
        recruiterId: candidateData.recruiterId
      },
      include: { recruiter: true }
    });
    return this.mapToDomain(candidate);
  }

  async update(id: number, candidateData: Partial<Omit<Candidate, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Candidate> {
    const candidate = await this.prisma.candidate.update({
      where: { id },
      data: {
        firstName: candidateData.firstName,
        lastName: candidateData.lastName,
        email: candidateData.email,
        phone: candidateData.phone,
        address: candidateData.address,
        status: candidateData.status,
        position: candidateData.position,
        recruiterId: candidateData.recruiterId
      },
      include: { recruiter: true }
    });
    return this.mapToDomain(candidate);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.candidate.delete({
      where: { id }
    });
  }

  async findByRecruiterId(recruiterId: number): Promise<Candidate[]> {
    const candidates = await this.prisma.candidate.findMany({
      where: { recruiterId },
      include: { recruiter: true }
    });
    return candidates.map(this.mapToDomain);
  }

  private mapToDomain(prismaCandidate: PrismaCandidate & { recruiter?: any }): Candidate {
    const candidate = new Candidate({
      firstName: prismaCandidate.firstName,
      lastName: prismaCandidate.lastName,
      email: prismaCandidate.email,
      phone: prismaCandidate.phone || undefined,
      address: prismaCandidate.address || undefined,
      status: prismaCandidate.status,
      position: prismaCandidate.position,
      recruiterId: prismaCandidate.recruiterId || undefined,
      recruiter: prismaCandidate.recruiter
    });
    
    // Set the id after construction since it's omitted from the constructor
    (candidate as any).id = prismaCandidate.id;
    (candidate as any).createdAt = prismaCandidate.createdAt;
    (candidate as any).updatedAt = prismaCandidate.updatedAt;
    
    return candidate;
  }
} 