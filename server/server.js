import express from 'express';
import cors from 'cors';

import './config/db.js'
import testRoutes from './routes/test.js';
import authRoutes from './routes/auth.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/test', testRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Backend working 🤠' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});