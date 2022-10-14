import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const server = express();
server.use(cors());
server.use(express.json());

server.listen(5000, () => console.log('server listening on port 5000'));