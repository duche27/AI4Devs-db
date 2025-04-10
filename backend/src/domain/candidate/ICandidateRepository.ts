import { Candidate } from './Candidate';

export interface ICandidateRepository {
  findAll(): Promise<Candidate[]>;
  findById(id: number): Promise<Candidate | null>;
  create(candidate: Omit<Candidate, 'id'>): Promise<Candidate>;
  update(id: number, candidate: Partial<Candidate>): Promise<Candidate>;
  delete(id: number): Promise<void>;
  findByRecruiterId(recruiterId: number): Promise<Candidate[]>;
} 