import { Router } from 'express';
import { db } from '../../knexfile';

export const animalsRouter = Router();

animalsRouter.get('/', (req, res) => {
  // get all animals from the database
  // include species name
  db('animals as a')
    .leftJoin('species as s', 's.id', 'a.species_id')
    .select('a.id', 'a.animal_name', 's.species_name')
    .then((animals) => {
      res.status(200).json(animals);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

animalsRouter.post('/', (req, res) => {
  db('animals')
    .insert(req.body)
    .then((ids) => {
      const id = ids[0];

      db('animals')
        .where({ id })
        .first()
        .then((animal) => {
          res.status(201).json(animal);
        });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});
