import { Router } from 'express';
import { CandidateController } from '../../../interfaces/controllers/CandidateController';
import { CandidateService } from '../../../application/services/CandidateService';
import { PrismaCandidateRepository } from '../../persistence/PrismaCandidateRepository';
import { PrismaRecruiterRepository } from '../../persistence/PrismaRecruiterRepository';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();
const candidateRepository = new PrismaCandidateRepository(prisma);
const recruiterRepository = new PrismaRecruiterRepository(prisma);
const candidateService = new CandidateService(candidateRepository, recruiterRepository);
const candidateController = new CandidateController(candidateService);

router.get('/', (req, res) => candidateController.getAllCandidates(req, res));
router.get('/:id', (req, res) => candidateController.getCandidateById(req, res));
router.post('/', (req, res) => candidateController.createCandidate(req, res));
router.patch('/:id', (req, res) => candidateController.updateCandidate(req, res));
router.delete('/:id', (req, res) => candidateController.deleteCandidate(req, res));
router.post('/:candidateId/recruiters/:recruiterId', (req, res) => candidateController.assignRecruiter(req, res));
router.delete('/:candidateId/recruiters', (req, res) => candidateController.unassignRecruiter(req, res));

export default router; 