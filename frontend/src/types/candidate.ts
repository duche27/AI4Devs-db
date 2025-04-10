export interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  position: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
} 