import { Candidate } from '../candidate/Candidate';

export interface IRecruiter {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department?: string;
  isActive: boolean;
  candidates?: Candidate[];
  createdAt: Date;
  updatedAt: Date;
}

export class Recruiter implements IRecruiter {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department?: string;
  isActive: boolean;
  candidates?: Candidate[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Omit<IRecruiter, 'id' | 'createdAt' | 'updatedAt'>) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = data.phone;
    this.department = data.department;
    this.isActive = data.isActive ?? true;
    this.candidates = data.candidates || [];
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
} 