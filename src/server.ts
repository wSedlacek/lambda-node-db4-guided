import * as express from 'express';
import * as helmet from 'helmet';

import { animalsRouter } from './routes/animals.routes';
import { speciesRouter } from './routes/species.routes';

export const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/species', animalsRouter);
server.use('/api/animals', speciesRouter);
