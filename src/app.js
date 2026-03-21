import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploaded images/videos
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/admin', adminRoutes);
app.use('/api', userRoutes);

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Photo AI API is running' });
});

app.use(errorHandler);

export default app;
