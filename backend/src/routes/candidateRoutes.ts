import { Router } from 'express';
import { Candidate } from '../domain/models/Candidate';

const router = Router();

// GET all candidates
router.get('/', async (req, res) => {
  try {
    Candidate.setPrismaClient(req.prisma);
    const candidates = await Candidate.findAll();
    res.status(200).json(candidates);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unexpected error occurred" });
    }
  }
});

// GET candidate by ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    Candidate.setPrismaClient(req.prisma);
    const candidate = await Candidate.findOne(id);
    if (!candidate) {
      return res.status(404).send({ message: "Candidate not found" });
    }
    res.status(200).json(candidate);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unexpected error occurred" });
    }
  }
});

// POST new candidate
router.post('/', async (req, res) => {
  try {
    Candidate.setPrismaClient(req.prisma);
    const candidate = new Candidate(req.body);
    const result = await candidate.save();
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unexpected error occurred" });
    }
  }
});

// PUT update candidate
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    Candidate.setPrismaClient(req.prisma);
    const candidate = await Candidate.findOne(id);
    if (!candidate) {
      return res.status(404).send({ message: "Candidate not found" });
    }
    Object.assign(candidate, req.body);
    const result = await candidate.save();
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unexpected error occurred" });
    }
  }
});

// DELETE candidate
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    Candidate.setPrismaClient(req.prisma);
    const candidate = await Candidate.findOne(id);
    if (!candidate) {
      return res.status(404).send({ message: "Candidate not found" });
    }
    await req.prisma.candidate.delete({ where: { id } });
    res.status(200).send({ message: "Candidate deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unexpected error occurred" });
    }
  }
});

export default router;
