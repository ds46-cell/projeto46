import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authroutes.js';
import transactionsRoutes from './routes/transactions.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando!' });
});

app.use('/auth', authRoutes);
app.use('/transactions', transactionsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
