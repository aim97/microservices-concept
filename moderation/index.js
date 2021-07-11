import App from 'express';
import axios from 'axios';
import cors from 'cors';
import { json } from 'body-parser';
// import { randomBytes } from 'crypto';
import R from 'ramda';

const app = App();

app.use(cors());
app.use(json());

const emitEvent = (type, content) => axios.post('http://localhost:5000/event', {type, content});

const filters = [
  (msg) => msg.includes('orange'),
]

const handleNewComment = (comment) => R.ifElse(
  R.converge(R.and(R.T), filters),
  () => emitEvent('commentedModerated', {...comment, status: 'rejected'}),
  () => emitEvent('commentedModerated', {...comment, status: 'accepted'}),
)(comment.content);

const handleEvent = ({type, content:comment}) => R.cond([
    [
      R.equals('commentCreated'), 
      () => handleNewComment(comment)
    ],
    [
      R.T,
      () => new Promise((resolve, reject) => {
        console.log(`I don't care about ${type} events`)
        resolve();
      }),
    ]
  ])(type)

app.post('/event', (req, res) => {
   handleEvent(req.body).then(() => res.status(200).send({})).catch(() => {
     console.log('We could not emit event to event bus for some reason, but who cares (not me XD)');
   })
});

app.listen(4100, () => {
 console.log('listening on port 4100');
});
