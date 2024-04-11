import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';

const users: User[] = [];

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Usarname and password are required' });
  }

  const duplicate = users.find((u) => u.username === username);
  if (duplicate) {
    return res.status(409).json({ message: 'User already exist' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    return res.status(201).json({ message: 'User registered succesfully' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Usarname and password are required' });
  }

  const user = users.find((u) => u.username === username);
  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!user || !isCorrectPassword) return res.status(401).json({ message: 'Invalid credentials' });

  const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refresToken = jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

  res.cookie('refreshToken', refresToken, {
    httpOnly: true,
    maxAge: 1 * 24 * 60 * 60 * 1000
  });

  res.json({ accessToken });
};

const logout = (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged aout successfully' });
};

const refresh = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, { username }) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });

    const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  });
};

export default { register, login, logout, refresh };
