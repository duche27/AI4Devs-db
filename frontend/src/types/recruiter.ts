import { Candidate } from './candidate';

export interface Recruiter {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  candidates?: Candidate[];
}

export interface CreateRecruiterDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department?: string;
}

export interface UpdateRecruiterDto extends Partial<CreateRecruiterDto> {} 