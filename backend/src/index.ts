import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import candidateRoutes from './infrastructure/http/routes/candidateRoutes';
import recruiterRoutes from './infrastructure/http/routes/recruiterRoutes';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/candidates', candidateRoutes);
app.use('/api/recruiters', recruiterRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
