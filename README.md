INTERN ID : CITS7193

# 📔 Digital Journal App

A full-stack journal web app for writing, editing, and organizing personal
entries — built with Node.js, Express, and vanilla JavaScript. Entries are
stored in a local JSON file, so your data persists across restarts.

## ✨ Features

- Create new journal entries with a title and content
- Read all entries, newest first
- Update existing entries in place
- Delete entries you no longer want
- Clean, modern UI with a glassmorphism (frosted-glass) design and a
  blurred background image
- Data persisted to disk (data/journal.json) — no database required

## 🛠️ Tech Stack

- Backend: Node.js, Express
- Frontend: HTML, CSS, vanilla JavaScript (no frameworks)
- Storage: JSON file on disk

## 📁 Project Structure

digital-journal-app/
├── server.js           # Express server & API routes
├── package.json
├── data/
│   └── journal.json    # Stored journal entries
└── public/
    ├── index.html       # App layout
    ├── style.css         # Styling
    ├── script.js         # Front-end logic (fetches the API)
    └── image/            # Background image assets


## 🚀 Getting Started

1. Clone the repository
git clone https://github.com/saran124-pro/Digital-Journal-App.git
cd Digital-Journal-App


2. Install dependencies
npm install


3. Start the server
node server.js


4. Open the app

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📡 API Reference

| Method | Endpoint             | Description               | Body                              |
|--------|-----------------------|----------------------------|-------------------------------------|
| GET    | /api/entries         | Get all entries            | —                                    |
| GET    | /api/entries/:id     | Get a single entry         | —                                    |
| POST   | /api/entries         | Create a new entry         | { "title": "", "content": "" }    |
| PUT    | /api/entries/:id     | Update an existing entry   | { "title": "", "content": "" }    |
| DELETE | /api/entries/:id     | Delete an entry            | —                                    |

## 📌 Notes

- All entries are stored locally in data/journal.json. Deleting this file
  will reset your journal.
- node_modules/ is excluded via .gitignore — always run npm install
  after cloning.

## 📄 License

This project is free to use and modify for personal or educational purposes.
