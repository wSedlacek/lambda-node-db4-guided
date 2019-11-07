import { Router } from 'express';
import { db } from '../../knexfile';

export const speciesRouter = Router();

speciesRouter.get('/', (req, res) => {
  // get all species from the database
  db('species')
    .then((species) => {
      res.status(200).json(species);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

speciesRouter.delete('/:id', (req, res) => {
  db('species')
    .where({ id: req.params.id })
    .del()
    .then((count) => {
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});
