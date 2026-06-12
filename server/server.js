import express from 'express';
import cors from 'cors';

import './config/db.js'
import authRoutes from './routes/auth.js';
import playerRoutes from './routes/player.js'
import dataRoutes from './routes/data.js'


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes)
app.use('/api/data', dataRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Backend working 🤠' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});