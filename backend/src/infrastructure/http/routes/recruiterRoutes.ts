import { Router } from 'express';
import { RecruiterController } from '../../../interfaces/controllers/RecruiterController';
import { RecruiterService } from '../../../application/services/RecruiterService';
import { PrismaRecruiterRepository } from '../../persistence/PrismaRecruiterRepository';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();
const recruiterRepository = new PrismaRecruiterRepository(prisma);
const recruiterService = new RecruiterService(recruiterRepository);
const recruiterController = new RecruiterController(recruiterService);

router.get('/', (req, res) => recruiterController.getAllRecruiters(req, res));
router.get('/:id', (req, res) => recruiterController.getRecruiterById(req, res));
router.post('/', (req, res) => recruiterController.createRecruiter(req, res));
router.patch('/:id', (req, res) => recruiterController.updateRecruiter(req, res));
router.delete('/:id', (req, res) => recruiterController.deleteRecruiter(req, res));

export default router; 