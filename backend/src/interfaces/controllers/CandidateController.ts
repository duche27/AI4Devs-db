import { Request, Response } from 'express';
import { CandidateService } from '../../application/services/CandidateService';

export class CandidateController {
  constructor(private candidateService: CandidateService) {}

  async getAllCandidates(req: Request, res: Response): Promise<void> {
    try {
      const candidates = await this.candidateService.getAllCandidates();
      res.json(candidates);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching candidates', error });
    }
  }

  async getCandidateById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const candidate = await this.candidateService.getCandidateById(id);
      if (!candidate) {
        res.status(404).json({ message: 'Candidate not found' });
        return;
      }
      res.json(candidate);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching candidate', error });
    }
  }

  async createCandidate(req: Request, res: Response): Promise<void> {
    try {
      const candidate = await this.candidateService.createCandidate(req.body);
      res.status(201).json(candidate);
    } catch (error) {
      res.status(400).json({ message: 'Error creating candidate', error });
    }
  }

  async updateCandidate(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const candidate = await this.candidateService.updateCandidate(id, req.body);
      res.json(candidate);
    } catch (error) {
      if (error.message === 'Candidate not found') {
        res.status(404).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: 'Error updating candidate', error });
    }
  }

  async deleteCandidate(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.candidateService.deleteCandidate(id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Candidate not found') {
        res.status(404).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Error deleting candidate', error });
    }
  }

  async assignRecruiter(req: Request, res: Response): Promise<void> {
    try {
      const candidateId = parseInt(req.params.candidateId);
      const recruiterId = parseInt(req.params.recruiterId);
      const candidate = await this.candidateService.assignRecruiter(candidateId, recruiterId);
      res.json(candidate);
    } catch (error) {
      if (error.message === 'Candidate not found' || error.message === 'Recruiter not found') {
        res.status(404).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: 'Error assigning recruiter', error });
    }
  }

  async unassignRecruiter(req: Request, res: Response): Promise<void> {
    try {
      const candidateId = parseInt(req.params.candidateId);
      const candidate = await this.candidateService.unassignRecruiter(candidateId);
      res.json(candidate);
    } catch (error) {
      if (error.message === 'Candidate not found') {
        res.status(404).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: 'Error unassigning recruiter', error });
    }
  }
} 