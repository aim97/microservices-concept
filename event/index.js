import App from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import axios from 'axios';

const app = App();

app.use(cors());
app.use(json());

const servicesEventRoutes = [
  'http://localhost:4000/event', // post
  'http://localhost:4001/event', // comments
  'http://localhost:4002/event', // query
]

// routes
app.post('/event', async (req, res) => {
  const event = req.body;
  console.log(req.body);
  await Promise.all(servicesEventRoutes.map((route) => axios.post(route, event)));

  res.status(200).send({});
});

app.listen(5000, () => {
 console.log('listening on port 5000');
});
