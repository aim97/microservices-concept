import App from 'express';
import axios from 'axios';
import cors from 'cors';
import { json } from 'body-parser';
import { randomBytes } from 'crypto';

const app = App();

app.use(cors());
app.use(json());



const handleEvent = async ({type, content:comment}) => {
  if (type === 'commentCreated') {
    const { content } = comment;
  } 
}

// routes
// this service allows
app.post('/event', (req, res) => {
  
});

app.listen(4100, () => {
 console.log('listening on port 4000');
});
