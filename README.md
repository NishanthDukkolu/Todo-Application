# Todo-Application

A Todo application with user authentication, built using:

-  Frontend: React.js
-  Backend: Node.js + Express.js
-  Database: MongoDB (via Mongoose)
-  Auth: JWT + bcryptjs
-  CORS: Enabled for cross-origin API calls

 Features
- User authentication (register & login)
- Create / Read / Update / Delete (CRUD) todos
- Protected routes with JWT middleware
- Passwords securely hashed with bcryptjs
- Persistent data using MongoDB
- Clean modular codebase (models, middleware, routes)

Project Structure
todo-fullstack-app/
├── backend/
│   ├── server.js          # Express app entry point
│   ├── models/            # Mongoose schemas (User.js, Todo.js)
│   ├── middleware/        # JWT auth middleware
│   ├── .env               # Environment variables
│   ├── package.json       # Backend dependencies
│   └── ...
└── frontend/
    ├── src/               # React components & pages
    ├── package.json
    

 Backend Setup

Install dependencies
``bash
cd backend
npm install
```
Create `.env`
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=secret_key
```

Run backend
```bash
npm start
```
Server runs on: **http://localhost:5000**  
CORS is already enabled in `server.js`.

---

 Frontend Setup
```bash
cd frontend
npm install
npm start
```

```bash
npx create-react-app frontend
```

Frontend runs on: **http://localhost:3000**

- API Endpoints

### Auth
- `POST /api/auth/register` → Register a user  
- `POST /api/auth/login` → Login & get JWT  

### Todos (require JWT in headers)
- `GET /api/todos` → Get all todos  
- `POST /api/todos` → Create todo  
- `PUT /api/todos/:id` → Update todo  
- `DELETE /api/todos/:id` → Delete todo  

---

## 🛠 Tech Stack
- React.js (frontend)
- Express.js + Node.js (backend)
- MongoDB + Mongoose (database)
- JWT + bcryptjs (authentication)
