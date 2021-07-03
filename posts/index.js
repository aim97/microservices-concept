import App from 'express';
import axios from 'axios';
import cors from 'cors';
import { json } from 'body-parser';
import { randomBytes } from 'crypto';

const app = App();

app.use(cors());
app.use(json());

const posts = [];

// routes
// this service allows
app.post('/', async (req, res) => {
  const { content } = req.body;
  const id = randomBytes(4).toString('hex');
  const post = {id, content};
  posts.push(post);
  console.log(post);

  await axios.post('http://localhost:5000/event', {
    type: 'postCreated',
    content: post,
  });

  res.status(201).send(post);
});

app.post('/event', (req, res) => {
  console.log(`event ${req.body.type} recieved`);
  res.send({});
});

app.listen(4000, () => {
 console.log('listening on port 4000');
});
