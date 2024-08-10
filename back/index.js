import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({
  origin: '*', // ou '*' para permitir todas as origens
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// Rota para obter todos os usuários
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Rota para criar um novo usuário
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const newUser = await prisma.user.create({
    data: { name, email },
  });
  res.json(newUser);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
