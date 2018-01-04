import express from 'express';
import config from '../config';
import initializeDb from '../db';
import word from '../controllers/word';

const router = express();

initializeDb(db => {
  router.use('/word', word({ config, db }));
});

export default router;
