import { Candidate } from '../../domain/candidate/Candidate';
import { ICandidateRepository } from '../../domain/candidate/ICandidateRepository';
import { IRecruiterRepository } from '../../domain/recruiter/IRecruiterRepository';
import { validateCandidateData } from '../validator';
import { Education } from '../../domain/models/Education';
import { WorkExperience } from '../../domain/models/WorkExperience';
import { Resume } from '../../domain/models/Resume';

export class CandidateService {
  constructor(
    private candidateRepository: ICandidateRepository,
    private recruiterRepository: IRecruiterRepository
  ) {}

  async getAllCandidates(): Promise<Candidate[]> {
    return this.candidateRepository.findAll();
  }

  async getCandidateById(id: number): Promise<Candidate | null> {
    return this.candidateRepository.findById(id);
  }

  async createCandidate(candidateData: Omit<Candidate, 'id'>): Promise<Candidate> {
    return this.candidateRepository.create(candidateData);
  }

  async updateCandidate(id: number, candidateData: Partial<Candidate>): Promise<Candidate> {
    const candidate = await this.candidateRepository.findById(id);
    if (!candidate) {
      throw new Error('Candidate not found');
    }
    return this.candidateRepository.update(id, candidateData);
  }

  async deleteCandidate(id: number): Promise<void> {
    const candidate = await this.candidateRepository.findById(id);
    if (!candidate) {
      throw new Error('Candidate not found');
    }
    return this.candidateRepository.delete(id);
  }

  async assignRecruiter(candidateId: number, recruiterId: number): Promise<Candidate> {
    const [candidate, recruiter] = await Promise.all([
      this.candidateRepository.findById(candidateId),
      this.recruiterRepository.findById(recruiterId)
    ]);

    if (!candidate) {
      throw new Error('Candidate not found');
    }
    if (!recruiter) {
      throw new Error('Recruiter not found');
    }

    candidate.assignRecruiter(recruiter);
    return this.candidateRepository.update(candidateId, candidate);
  }

  async unassignRecruiter(candidateId: number): Promise<Candidate> {
    const candidate = await this.candidateRepository.findById(candidateId);
    if (!candidate) {
      throw new Error('Candidate not found');
    }

    candidate.unassignRecruiter();
    return this.candidateRepository.update(candidateId, candidate);
  }
}

export const addCandidate = async (candidateData: any) => {
    try {
        validateCandidateData(candidateData); // Validar los datos del candidato
    } catch (error: any) {
        throw new Error(error);
    }

    const candidate = new Candidate(candidateData); // Crear una instancia del modelo Candidate
    try {
        const savedCandidate = await candidate.save(); // Guardar el candidato en la base de datos
        const candidateId = savedCandidate.id; // Obtener el ID del candidato guardado

        // Guardar la educación del candidato
        if (candidateData.educations) {
            for (const education of candidateData.educations) {
                const educationModel = new Education(education);
                educationModel.candidateId = candidateId;
                await educationModel.save();
                candidate.education.push(educationModel);
            }
        }

        // Guardar la experiencia laboral del candidato
        if (candidateData.workExperiences) {
            for (const experience of candidateData.workExperiences) {
                const experienceModel = new WorkExperience(experience);
                experienceModel.candidateId = candidateId;
                await experienceModel.save();
                candidate.workExperience.push(experienceModel);
            }
        }

        // Guardar los archivos de CV
        if (candidateData.cv && Object.keys(candidateData.cv).length > 0) {
            const resumeModel = new Resume(candidateData.cv);
            resumeModel.candidateId = candidateId;
            await resumeModel.save();
            candidate.resumes.push(resumeModel);
        }
        return savedCandidate;
    } catch (error: any) {
        if (error.code === 'P2002') {
            // Unique constraint failed on the fields: (`email`)
            throw new Error('The email already exists in the database');
        } else {
            throw error;
        }
    }
};

export const getCandidateById = async (id: number): Promise<Candidate | null> => {
    try {
        const candidate = await Candidate.findOne(id);
        return candidate;
    } catch (error: any) {
        throw new Error('Database connection error');
    }
};

export const getAllCandidates = async (): Promise<Candidate[]> => {
    try {
        const candidates = await Candidate.findAll();
        return candidates;
    } catch (error: any) {
        throw new Error('Database connection error');
    }
};

export const updateCandidate = async (id: number, candidateData: any): Promise<Candidate | null> => {
    try {
        const candidate = await Candidate.findOne(id);
        if (!candidate) {
            return null;
        }
        
        // Update candidate fields
        Object.keys(candidateData).forEach(key => {
            if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
                candidate[key] = candidateData[key];
            }
        });
        
        const updatedCandidate = await candidate.save();
        return updatedCandidate;
    } catch (error: any) {
        if (error.code === 'P2002') {
            throw new Error('The email already exists in the database');
        } else {
            throw error;
        }
    }
};

export const deleteCandidate = async (id: number): Promise<boolean> => {
    try {
        const candidate = await Candidate.findOne(id);
        if (!candidate) {
            return false;
        }
        
        await candidate.delete();
        return true;
    } catch (error: any) {
        throw new Error('Database connection error');
    }
};