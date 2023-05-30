const express = require('express');
const app = express();
const port = 3000;

const bcrypt = require('bcrypt');
const user = require('./user');

const Joi = require('joi');

app.use(express.json());

const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

app.post('/register', async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { username, password } = req.body;

  const existingUser = await user.getUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ error: 'Nome de usuário já está em uso.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.createUser({
      username,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar o usuário.' });
  }
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

app.post('/login', async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { username, password } = req.body;

  const user = await user.getUserByUsername(username);
  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  try {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    res.json({ message: 'Login bem-sucedido.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});

app.listen(port);
