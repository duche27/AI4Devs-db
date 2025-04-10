import { Request, Response } from 'express';
import { addCandidate, getCandidateById, getAllCandidates, updateCandidate, deleteCandidate } from '../../application/services/candidateService';

export const addCandidateController = async (req: Request, res: Response) => {
    try {
        const candidateData = req.body;
        const candidate = await addCandidate(candidateData);
        res.status(201).json({ message: 'Candidate added successfully', data: candidate });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error adding candidate', error: error.message });
        } else {
            res.status(400).json({ message: 'Error adding candidate', error: 'Unknown error' });
        }
    }
};

export const getCandidateByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(Number(id))) {
        return res.status(400).json({ message: 'Invalid candidate ID' });
    }

    try {
        const candidate = await getCandidateById(Number(id));
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json(candidate);
    } catch (error: unknown) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllCandidatesController = async (req: Request, res: Response) => {
    try {
        const candidates = await getAllCandidates();
        res.status(200).json(candidates);
    } catch (error: unknown) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateCandidateController = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(Number(id))) {
        return res.status(400).json({ message: 'Invalid candidate ID' });
    }

    try {
        const candidate = await updateCandidate(Number(id), req.body);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json(candidate);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error updating candidate', error: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export const deleteCandidateController = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(Number(id))) {
        return res.status(400).json({ message: 'Invalid candidate ID' });
    }

    try {
        const result = await deleteCandidate(Number(id));
        if (!result) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (error: unknown) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { addCandidate, getCandidateById, getAllCandidates, updateCandidate, deleteCandidate };