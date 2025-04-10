import { Recruiter } from './Recruiter';

export interface IRecruiterRepository {
  findAll(): Promise<Recruiter[]>;
  findById(id: number): Promise<Recruiter | null>;
  create(recruiter: Omit<Recruiter, 'id'>): Promise<Recruiter>;
  update(id: number, recruiter: Partial<Recruiter>): Promise<Recruiter>;
  delete(id: number): Promise<void>;
  findByEmail(email: string): Promise<Recruiter | null>;
} 