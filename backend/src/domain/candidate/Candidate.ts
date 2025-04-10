import { IRecruiter } from '../recruiter/Recruiter';

export interface ICandidate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  status: string;
  position: string;
  recruiter?: IRecruiter;
  recruiterId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Candidate implements ICandidate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  status: string;
  position: string;
  recruiter?: IRecruiter;
  recruiterId?: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Omit<ICandidate, 'id' | 'createdAt' | 'updatedAt'>) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this.status = data.status || 'new';
    this.position = data.position;
    this.recruiter = data.recruiter;
    this.recruiterId = data.recruiterId;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  assignRecruiter(recruiter: IRecruiter): void {
    this.recruiter = recruiter;
    this.recruiterId = recruiter.id;
  }

  unassignRecruiter(): void {
    this.recruiter = undefined;
    this.recruiterId = undefined;
  }
} 