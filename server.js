const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'journal.json');

function readEntries() {
  const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(rawData);
}

function writeEntries(entries) {
  const jsonString = JSON.stringify(entries, null, 2);
  fs.writeFileSync(DATA_FILE, jsonString);
}

app.get('/api/entries', (req, res) => {
  const entries = readEntries();
  res.json(entries);
});

app.get('/api/entries/:id', (req, res) => {
  const entries = readEntries();
  const entry = entries.find(e => String(e.id) === req.params.id);
  if (!entry) {
    return res.status(404).json({ error: 'Entry not found' });
  }
  res.json(entry);
});

app.post('/api/entries', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const entries = readEntries();

  const newEntry = {
    id: Date.now(),
    title,
    content,
    date: new Date().toISOString().split('T')[0]
  };

  entries.push(newEntry);
  writeEntries(entries);

  res.status(201).json(newEntry);
});

app.put('/api/entries/:id', (req, res) => {
  const entries = readEntries();
  const entry = entries.find(e => String(e.id) === req.params.id);

  if (!entry) {
    return res.status(404).json({ error: 'Entry not found' });
  }

  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  entry.title = title;
  entry.content = content;
  entry.date = new Date().toISOString().split('T')[0];

  writeEntries(entries);
  res.json(entry);
});

app.delete('/api/entries/:id', (req, res) => {
  const entries = readEntries();
  const index = entries.findIndex(e => String(e.id) === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Entry not found' });
  }

  const deleted = entries.splice(index, 1);
  writeEntries(entries);

  res.json({ message: 'Entry deleted', entry: deleted[0] });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
