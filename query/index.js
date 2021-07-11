import App from 'express';
import cors from 'cors';
import R from 'ramda';
import { json } from 'body-parser';
import axios from 'axios';

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

const removeComment = (postId, id) => {
  const idx = posts[postId].comments.find((comment) => comment.id === id);
  posts[postId].comments.splice(idx, 1);
}

const handleEvent = ({ type, content }) => {
  R.cond([
    [R.equals('postCreated'), () => handleNewPost(content)],
    [R.equals('commentCreated'), () => handleNewComment(content.postId, content)],
    [R.equals('commentUpdated'), () => {
      removeComment(content.postId, content.id);
      handleNewComment(content.postId, content);
    }]
  ])(type);
  console.log(posts);
}

app.post('/event', (req, res) => {
  console.log(req.body);
  
  handleEvent(req.body);

  res.status(200).send({});
});


app.listen(4002, async () => {
  console.log('listening on port 4002\nInitializing service ...');
  const res = await axios.get('http://localhost:5000/hist');
  console.log(res.data);
  R.map(handleEvent, res.data);
});
