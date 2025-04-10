import { PrismaClient } from '@prisma/client';
import { Candidate } from '../../domain/candidate/Candidate';
import { ICandidateRepository } from '../../domain/candidate/ICandidateRepository';

export class PrismaCandidateRepository implements ICandidateRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Candidate[]> {
    const candidates = await this.prisma.candidate.findMany({
      include: { recruiter: true }
    });
    return candidates.map(c => new Candidate(c));
  }

  async findById(id: number): Promise<Candidate | null> {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id },
      include: { recruiter: true }
    });
    return candidate ? new Candidate(candidate) : null;
  }

  async create(candidateData: Omit<Candidate, 'id'>): Promise<Candidate> {
    const candidate = await this.prisma.candidate.create({
      data: candidateData,
      include: { recruiter: true }
    });
    return new Candidate(candidate);
  }

  async update(id: number, candidateData: Partial<Candidate>): Promise<Candidate> {
    const candidate = await this.prisma.candidate.update({
      where: { id },
      data: candidateData,
      include: { recruiter: true }
    });
    return new Candidate(candidate);
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
    return candidates.map(c => new Candidate(c));
  }
} 