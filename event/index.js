import App from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import axios from 'axios';

const app = App();

app.use(cors());
app.use(json());

const events = [];

const servicesEventRoutes = [
  'http://localhost:4000/event', // post
  'http://localhost:4001/event', // comments
  'http://localhost:4002/event', // query
]

// add a route to send all previous event to a service that just joined
app.get('/hist', async (req, res) => {
  res.status(200).send(events);
});

// routes
app.post('/event', async (req, res) => {
  const event = req.body;
  events.push(event);
  await Promise.all(servicesEventRoutes.map((route) => {
    const res = axios.post(route, event);
    res.catch(() => console.log('it seems we couldn\'t reach ' + route));
  }));
  res.status(200).send({});
});

app.listen(5000, () => {
 console.log('listening on port 5000');
});
