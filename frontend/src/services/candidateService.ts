import axios from 'axios';
import { Candidate } from '../types/candidate';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3010/api';

const candidateService = {
  getAll: async (): Promise<Candidate[]> => {
    const response = await axios.get(`${API_URL}/candidates`);
    return response.data;
  },

  getById: async (id: number): Promise<Candidate> => {
    const response = await axios.get(`${API_URL}/candidates/${id}`);
    return response.data;
  },

  create: async (data: Omit<Candidate, 'id'>): Promise<Candidate> => {
    const response = await axios.post(`${API_URL}/candidates`, data);
    return response.data;
  },

  update: async (id: number, data: Partial<Candidate>): Promise<Candidate> => {
    const response = await axios.patch(`${API_URL}/candidates/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/candidates/${id}`);
  }
};

export default candidateService; 