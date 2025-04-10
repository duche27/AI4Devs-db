import axios from 'axios';
import { Recruiter, CreateRecruiterDto, UpdateRecruiterDto } from '../types/recruiter';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3010/api';

export const recruiterService = {
  getAll: async (): Promise<Recruiter[]> => {
    const response = await axios.get(`${API_URL}/recruiters`);
    return response.data;
  },

  getById: async (id: number): Promise<Recruiter> => {
    const response = await axios.get(`${API_URL}/recruiters/${id}`);
    return response.data;
  },

  create: async (data: CreateRecruiterDto): Promise<Recruiter> => {
    const response = await axios.post(`${API_URL}/recruiters`, data);
    return response.data;
  },

  update: async (id: number, data: UpdateRecruiterDto): Promise<Recruiter> => {
    const response = await axios.patch(`${API_URL}/recruiters/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/recruiters/${id}`);
  },

  assignCandidate: async (recruiterId: number, candidateId: number): Promise<void> => {
    await axios.post(`${API_URL}/recruiters/${recruiterId}/candidates/${candidateId}`);
  },

  unassignCandidate: async (candidateId: number): Promise<void> => {
    await axios.delete(`${API_URL}/recruiters/candidates/${candidateId}`);
  }
}; 