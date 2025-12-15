const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// serve static UI
app.use('/', express.static(path.join(__dirname, 'public')));

// simple in-memory messages store (demo only)
const messages = [];

app.get('/api/messages', (req, res) => {
  res.json({ ok: true, messages });
});

app.post('/api/messages', (req, res) => {
  const { text } = req.body || {};
  if (!text || typeof text !== 'string' || text.length > 500) {
    return res.status(400).json({ ok: false, error: 'invalid text' });
  }
  const msg = { id: Date.now(), text };
  messages.push(msg);
  res.status(201).json({ ok: true, message: msg });
});

// health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
