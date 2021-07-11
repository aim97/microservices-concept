import App from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import R from 'ramda';
import { randomBytes } from 'crypto';
import axios from 'axios';

const app = App();

app.use(cors());
app.use(json());

const postIds = []
const comments = [];

// routes
app.post('/posts/:id', async (req, res) => {
  const postId = req.params.id;

  if (R.includes(postId, postIds)){
    const id = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comment = {
      id, postId, content, status: 'pending'
    }
    comments.push(comment);
    await axios.post('http://localhost:5000/event', {type: 'commentCreated', content: comment});

    res.status(200).send(comment);
  } else {
    res.status(403).send({});
  }
});

app.post('/event', (req, res) => {
  const {type, content } = req.body;
  console.log(req.body);
  if (type === 'postCreated') {
    const {id: postId} = content;
    postIds.push(postId);
  }
  console.log(postIds);
  res.status(200).send({});
});

app.listen(4001, () => {
  console.log('listening on port 4001');
});
