# 🚀 NestJS Prisma Authentication API

A secure, high-performance, modular REST API built with **NestJS**, **Prisma ORM (v7)**, **JWT Authentication**, and **PostgreSQL**. This project features a robust product management system with reviews, user roles (ADMIN/USER), and automated error handling.

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" />
  <img src="https://raw.githubusercontent.com/prisma/github-assets/master/logo.png" width="100" alt="Prisma Logo" />
</p>

---

## 🛠 Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **ORM:** [Prisma v7](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Authentication:** [JWT (JSON Web Token)](https://jwt.io/)
- **Security:** [Bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing
- **Documentation:** [Swagger/OpenAPI](https://swagger.io/)

---

## ✨ Features

- **🔒 Secure Authentication & Authorization:**
  - JWT-based login and logout systems.
  - Role-based Access Control (RBAC): `ADMIN` and `USER` roles.
  - Ownership protection: Users can only modify/delete their own products and reviews unless they are an `ADMIN`.
- **🛠 Global Error Handling:**
  - Automated Prisma exception filter for clean database error messages (e.g., "Unique constraint failed").
  - Automated validation pipes for input sanitization and verification.
- **📦 Modular Architecture:** Clean separation of concerns with dedicated modules for Auth, Products, and Reviews.
- **💎 Advanced Relational Mapping:**
  - `User` ↔ `Product` (One-to-Many)
  - `Product` ↔ `Reviews` (One-to-Many with Cascade Delete)
  - `Product` ↔ `Title` (One-to-One)
  - `Product` ↔ `Tags` (Many-to-Many)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v20 or higher)
- PostgreSQL instance running

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME?schema=public"
JWT_SECRET="your_secure_jwt_secret_key"
PORT=3000
```

### 4. Database Setup
Sync your database with the Prisma schema and generate the client:
```bash
npx prisma migrate dev
npx prisma generate
```

---

## 🏃 Running the App

```bash
# Auto-setup & Start (Custom script)
chmod +x start-api.sh
./start-api.sh

# Standard Development (with watch mode)
npm run start:dev

# Swagger Documentation (While app is running)
# Access at: http://localhost:3000/api
```

---

## 📡 API Endpoints Summary

### Auth
- `POST /auth/sign-up` - Register a new user (`ADMIN` or `USER`)
- `POST /auth/sign-in` - Login and receive JWT access token
- `POST /auth/log-out` - End session
- `GET /auth` - List users (Protected)

### Products (Protected)
- `POST /products` - Create product (**Admin only**, owner linked automatically)
- `GET /products` - Publicly list products
- `PATCH /products/:id` - Update product (**Admin or Owner only**)
- `DELETE /products/:id` - Delete product (**Admin or Owner only**)

### Reviews (Protected)
- `POST /reviews` - Submit a review for a product
- `GET /reviews` - Publicly list reviews
- `PATCH /reviews/:id` - Update review (**Admin or Owner only**)
- `DELETE /reviews/:id` - Delete review (**Admin or Owner only**)

---

## 🧪 Testing
Use the included `data.http` file with the **REST Client** extension in VS Code to test all endpoints.

---

## 📜 License
This project is [UNLICENSED](LICENSE).
