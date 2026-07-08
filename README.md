# Home Image
<img width="1910" height="907" alt="image" src="https://github.com/user-attachments/assets/d9880e84-040d-4371-bff5-d30db8b42a4c" />

<img width="1697" height="891" alt="image" src="https://github.com/user-attachments/assets/d5c059d4-04b6-4ee5-9954-0b5dce37315a" />

<img width="1405" height="830" alt="image" src="https://github.com/user-attachments/assets/830e73ee-2d29-4352-80fd-871ae1e5d4e0" />

# Auth Image

<img width="962" height="775" alt="image" src="https://github.com/user-attachments/assets/ff8f2ee6-9351-4477-affb-a6433543fed9" />
<img width="962" height="775" alt="image" src="https://github.com/user-attachments/assets/a7b4d8b2-228f-48ad-8ac1-1a714f622c43" />
<img width="962" height="775" alt="image" src="https://github.com/user-attachments/assets/bec7b663-9d18-4ff3-ae3b-9ebb1dfc1461" />




# BookMook

A full-stack online bookstore built with Next.js and Express.

---

## Project Structure

```
bookmook/
├── frontend/   # Next.js app #
└── backend/    # Express + MongoDB API
```

---

## Tech Stack

**Frontend (AI GENERATED)**

- Next.js 16, React 18, TypeScript
- Tailwind CSS, shadcn/ui, Framer Motion
- Swiper, React Hook Form, Zod

**Backend**

- Express 5, TypeScript
- MongoDB + Mongoose
- dotenv, cors

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

---

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookmook
```

```bash
npm run dev
```

The API runs on `http://localhost:3000`

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:3001`

---

## API Routes

### Books

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | `/api/book/getAll`       | Get all books    |
| GET    | `/api/book/:slug` | Get book by slug |

### Comments

| Method | Endpoint                | Description                        |
| ------ | ----------------------- | ---------------------------------- |
| GET    | `/api/comment/featured` | Get featured comments (rating ≥ 4) |
| GET    | `/api/comment/:id`      | Get comments for a book            |
| POST   | `/api/comment/:id`      | Add a comment to a book            |

---

## Scripts

### Backend

> Two terminals needed:

| Terminal | Command |
|----------|---------|
| 1 | `npm run watch:build` |
| 2 | `npm run watch:run` |

### Frontend

| Script            | Description       |
| ----------------- | ----------------- |
| `npm run dev`     | Start dev server  |
| `npm run build`   | Production build  |
| `npm run db:seed` | Seed the database |

---

## Environment Variables

### Backend — `.env`

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

### Frontend — `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```
