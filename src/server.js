import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js'

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use(authRouter);

server.listen(process.env.PORT, () => console.log(`server listening on port ${process.env.PORT}`));