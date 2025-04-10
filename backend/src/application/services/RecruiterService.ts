import { Recruiter } from '../../domain/recruiter/Recruiter';
import { IRecruiterRepository } from '../../domain/recruiter/IRecruiterRepository';

export class RecruiterService {
  constructor(private recruiterRepository: IRecruiterRepository) {}

  async getAllRecruiters(): Promise<Recruiter[]> {
    return this.recruiterRepository.findAll();
  }

  async getRecruiterById(id: number): Promise<Recruiter | null> {
    return this.recruiterRepository.findById(id);
  }

  async createRecruiter(recruiterData: Omit<Recruiter, 'id'>): Promise<Recruiter> {
    const existingRecruiter = await this.recruiterRepository.findByEmail(recruiterData.email);
    if (existingRecruiter) {
      throw new Error('Recruiter with this email already exists');
    }
    return this.recruiterRepository.create(recruiterData);
  }

  async updateRecruiter(id: number, recruiterData: Partial<Recruiter>): Promise<Recruiter> {
    const recruiter = await this.recruiterRepository.findById(id);
    if (!recruiter) {
      throw new Error('Recruiter not found');
    }

    if (recruiterData.email) {
      const existingRecruiter = await this.recruiterRepository.findByEmail(recruiterData.email);
      if (existingRecruiter && existingRecruiter.id !== id) {
        throw new Error('Recruiter with this email already exists');
      }
    }

    return this.recruiterRepository.update(id, recruiterData);
  }

  async deleteRecruiter(id: number): Promise<void> {
    const recruiter = await this.recruiterRepository.findById(id);
    if (!recruiter) {
      throw new Error('Recruiter not found');
    }
    return this.recruiterRepository.delete(id);
  }
} 