import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import config from './config';
import routes from './routes';

const app = express();
app.server = http.createServer(app);

app.use(
  bodyParser.json({
    limit: config.bodyLimit,
  })
);

app.use('/api', routes);
app.server.listen(config.port);

console.log(`Started on port ${config.port}`);

export default app;
