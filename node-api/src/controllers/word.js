import mongoose from 'mongoose';
import { Router } from 'express';
import Word from '../models/word';
mongoose.Promise = global.Promise;

export default () => {
  const api = Router();

  api.post('/add', ({ body }, res) => {
    const newWord = new Word();
    newWord.description = body.description;
    newWord.meaning = body.meaning;

    newWord.save(err => {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Word saved successfully' });
    });
  });

  api.get('/', (req, res) => {
    Word.find({}, (err, words) => {
      if (err) {
        res.send(err);
      }

      res.json(words);
    });
  });

  api.get('/:id', ({ params }, res) => {
    Word.findById(params.id, (err, word) => {
      if (err) {
        res.send(err);
      }

      res.json(word);
    });
  });

  api.put('/:id', ({ body, params }, res) => {
    Word.findById(params.id, (err, word) => {
      if (err) {
        res.send(err);
      }

      word.description = body.description || word.description;
      word.meaning = body.meaning || word.meaning;

      word.save(err => {
        if (err) {
          res.send(err);
        }

        res.json({ message: 'Word information was updated' });
      });
    });
  });

  api.delete('/:id', (req, res) => {
    Word.remove({ _id: req.params.id }, err => {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Word successfully removed' });
    });
  });

  return api;
};
