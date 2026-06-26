<div align="center">

# 🚀 Prisma Press Backend

### 🔐 Secure Authentication API built with Express, TypeScript, Prisma & PostgreSQL

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

A modern backend starter featuring **JWT Authentication**, **Cookie-Based Security**, **Prisma ORM**, and **TypeScript** for building scalable REST APIs.

</div>

---

## ✨ Features

✅ User Registration

✅ Secure User Login

✅ JWT Access Token Authentication

✅ Refresh Token Support

✅ HTTP-Only Cookie Storage

✅ Password Hashing with Bcrypt

✅ Prisma ORM Integration

✅ PostgreSQL Database

✅ Request Validation

✅ Centralized Error Handling

✅ TypeScript Support

✅ Environment Configuration

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|----------|
| ⚡ Node.js | Runtime Environment |
| 🚂 Express.js | Backend Framework |
| 🔷 TypeScript | Type Safety |
| 🔺 Prisma ORM | Database ORM |
| 🐘 PostgreSQL | Database |
| 🔐 JWT | Authentication |
| 🍪 Cookie Parser | Cookie Management |
| 🔒 Bcrypt | Password Hashing |
| 🌱 Dotenv | Environment Variables |

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── modules/
│   │   └── auth/
│   ├── middlewares/
│   ├── routes/
│   ├── utils/
│   └── errors/
│
├── config/
├── lib/
├── app.ts
└── server.ts

prisma/
├── schema.prisma
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sakib404-hub/prisma-press-practice.git

cd prisma-press-practice
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file:

```env
PORT=5000

DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

JWT_ACCESS_TOKEN_EXPIRATION=1d
JWT_REFRESH_TOKEN_EXPIRATION=30d

BCRYPT_SALT_ROUNDS=10
```

---

## 🗄️ Database Setup

### Generate Prisma Client

```bash
npx prisma generate
```

### Run Migration

```bash
npx prisma migrate dev
```

### Open Prisma Studio

```bash
npx prisma studio
```

---

## ▶️ Running the Project

### Development Mode

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

---

## 🔑 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/auth/register` | Register User |
| POST | `/api/v1/auth/login` | Login User |
| GET | `/api/v1/auth/me` | Current Logged-in User |
| GET | `/api/v1/auth/getAll` | Get All Users |

---

## 🔄 Authentication Flow

```text
User Login
    │
    ▼
Generate Access Token
    │
    ▼
Generate Refresh Token
    │
    ▼
Store Tokens in HTTP-Only Cookies
    │
    ▼
Access Protected Routes
    │
    ▼
Refresh Access Token When Expired
```

---

## 📜 Available Scripts

```bash
npm run dev      # Development Server
npm run build    # Build Project
npm start        # Production Server
```

---

## 🎯 Upcoming Features

- 👮 Role-Based Authorization
- 🔄 Refresh Token Rotation
- 📧 Email Verification
- 🔑 Password Reset
- 👤 User Profile Management
- 🚦 Rate Limiting
- 📚 Swagger Documentation
- 🧪 Unit & Integration Testing
---

## 👨‍💻 Author

<div align="center">

# Md. Shakib Hossen

💻 Backend Developer in Progress

🚀 Passionate about Backend Engineering

🏗️ Building Scalable Applications

📚 Learning Every Day

<a href="https://github.com/sakib404-hub">
<img src="https://img.shields.io/badge/GitHub-@sakib404--hub-181717?style=for-the-badge&logo=github"/>
</a>

<a href="https://www.linkedin.com/in/sakibhossen-dev7011">
<img src="https://img.shields.io/badge/LinkedIn-Md.%20Shakib%20Hossen-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>

</div>

---

<div align="center">

### ⭐ If you found this project helpful, consider giving it a star!

🚀 Happy Coding 🚀

</div>
