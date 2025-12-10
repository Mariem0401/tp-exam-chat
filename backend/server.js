// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // autorise toutes origines (ok pour examen)
app.use(express.json());

const PORT = process.env.PORT || 3000;

// stockage en mémoire
let messages = [
  { id: 1, author: 'Mariem Guibene ', content: 'Bienvenue !', time: new Date().toISOString() }
];

// GET /api/messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// POST /api/messages  { author, content }
app.post('/api/messages', (req, res) => {
  const { author, content } = req.body || {};
  if (!author || !content) {
    return res.status(400).json({ error: 'author and content required' });
  }
  const msg = {
    id: messages.length ? messages[messages.length - 1].id + 1 : 1,
    author,
    content,
    time: new Date().toISOString()
  };
  messages.push(msg);
  // limite raisonnable en mémoire
  if (messages.length > 1000) messages.shift();
  res.status(201).json(msg);
});

// health
app.get('/health', (req, res) => res.send('ok'));

app.listen(PORT, () => {
  console.log(`Backend started on port ${PORT}`);
});
