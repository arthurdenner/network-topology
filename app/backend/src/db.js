import mongoose from 'mongoose';
import config from './config';

export default callback => {
  const db = mongoose.connect(config.mongoUrl, {
    useMongoClient: true,
  });

  callback(db);
};
