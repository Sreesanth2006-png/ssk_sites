# Basic Full-Stack Todo (Node.js + Vanilla JS)

A minimal full-stack project with a small Node.js HTTP server and a vanilla JavaScript frontend.

## Run

```bash
cd basic-fullstack
npm start
```

Then open `http://localhost:3000`.

## Endpoints

- `GET /api/todos` – list todos
- `POST /api/todos` – create { text }
- `PATCH /api/todos` – update { id, done?, text? }
- `DELETE /api/todos?id=ID` – delete by id

Static files are served from `/public`.