import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';

@Injectable()
export class RecruiterService {
  constructor(private prisma: PrismaService) {}

  create(createRecruiterDto: CreateRecruiterDto) {
    return this.prisma.recruiter.create({
      data: createRecruiterDto,
    });
  }

  findAll() {
    return this.prisma.recruiter.findMany({
      include: {
        candidates: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.recruiter.findUnique({
      where: { id },
      include: {
        candidates: true,
      },
    });
  }

  update(id: number, updateRecruiterDto: UpdateRecruiterDto) {
    return this.prisma.recruiter.update({
      where: { id },
      data: updateRecruiterDto,
    });
  }

  remove(id: number) {
    return this.prisma.recruiter.delete({
      where: { id },
    });
  }

  assignCandidate(recruiterId: number, candidateId: number) {
    return this.prisma.candidate.update({
      where: { id: candidateId },
      data: { recruiterId },
    });
  }

  unassignCandidate(candidateId: number) {
    return this.prisma.candidate.update({
      where: { id: candidateId },
      data: { recruiterId: null },
    });
  }
} 