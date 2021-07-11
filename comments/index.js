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

const emitEvent = (type, content) => axios.post('http://localhost:5000/event', {type, content});

const handleEvent = ({type, content}) => R.cond([
  [
    R.equals('postCreated'),
    () => {
      const {id: postId} = content;
      postIds.push(postId);
    },
  ],
  [
    R.equals('commentedModerated'),
    () => {
      const { id } = content;
      const idx = comments.find((comment) => comment.id === id);
      comments.splice(idx, 1);
      comments.push(content);
      emitEvent('commentUpdated', content);
    },
  ],
])(type);

// routes
app.post('/posts/:id', async (req, res) => {
  const postId = req.params.id;

  if (R.includes(postId, postIds)){
    const id = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comment = {
      id, postId, content, status: 'pending',
    }
    comments.push(comment);
    await emitEvent('commentCreated', comment);

    res.status(200).send(comment);
  } else {
    res.status(403).send({});
  }
});


app.post('/event', (req, res) => {
  console.log(req.body);
  handleEvent(req.body); 
  console.log(postIds);
  res.status(200).send({});
});

app.listen(4001, async () => {
  console.log('listening on port 4001\nInitializing service ...');
  const res = await axios.get('http://localhost:5000/hist');
  console.log(res.data);
  R.map(handleEvent, res.data);
});
