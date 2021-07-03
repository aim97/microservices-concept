import App from 'express';
import cors from 'cors';
import R from 'ramda';
import { json } from 'body-parser';

const whitelist = ["http://localhost:3000"];

const app = App();

app.use(cors());
app.options('*', cors());
app.use(json());

const posts = {};

// routes
app.get('/', (req, res) => {
  res.send(Object.values(posts));
});

const handleNewPost = post => {
  posts[post.id] = { ...post, comments: []}
};

const handleNewComment = (postId, comment) => {
  posts[postId].comments.push(comment);
};

app.post('/event', (req, res) => {
  const { type, content } = req.body;
  console.log(req.body);
  R.cond([
    [R.equals('postCreated'), () => handleNewPost(content)],
    [R.equals('commentCreated'), () => handleNewComment(content.postId, content)],
  ])(type);

  res.status(200).send({});
});


app.listen(4002, () => {
  console.log('listening on port 4002');
});
