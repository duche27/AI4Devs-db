import { Request, Response } from 'express';
import { RecruiterService } from '../../application/services/RecruiterService';

export class RecruiterController {
  constructor(private recruiterService: RecruiterService) {}

  async getAllRecruiters(req: Request, res: Response): Promise<void> {
    try {
      const recruiters = await this.recruiterService.getAllRecruiters();
      res.json(recruiters);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching recruiters', error });
    }
  }

  async getRecruiterById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const recruiter = await this.recruiterService.getRecruiterById(id);
      if (!recruiter) {
        res.status(404).json({ message: 'Recruiter not found' });
        return;
      }
      res.json(recruiter);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching recruiter', error });
    }
  }

  async createRecruiter(req: Request, res: Response): Promise<void> {
    try {
      const recruiter = await this.recruiterService.createRecruiter(req.body);
      res.status(201).json(recruiter);
    } catch (error) {
      if (error.message === 'Recruiter with this email already exists') {
        res.status(409).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: 'Error creating recruiter', error });
    }
  }

  async updateRecruiter(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const recruiter = await this.recruiterService.updateRecruiter(id, req.body);
      res.json(recruiter);
    } catch (error) {
      if (error.message === 'Recruiter not found') {
        res.status(404).json({ message: error.message });
        return;
      }
      if (error.message === 'Recruiter with this email already exists') {
        res.status(409).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: 'Error updating recruiter', error });
    }
  }

  async deleteRecruiter(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.recruiterService.deleteRecruiter(id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Recruiter not found') {
        res.status(404).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Error deleting recruiter', error });
    }
  }
} 