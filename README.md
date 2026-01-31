# 🚀 NestJS Prisma API

A high-performance, modular REST API built with **NestJS**, **Prisma ORM (v7)**, and **PostgreSQL**. This project features a robust product management system with reviews, categories, and advanced relational mapping.

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" />
  <img src="https://raw.githubusercontent.com/prisma/github-assets/master/logo.png" width="100" alt="Prisma Logo" />
</p>

---

## 🛠 Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **ORM:** [Prisma v7](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Language:** TypeScript
- **Driver Adapter:** `@prisma/adapter-pg`

---

## ✨ Features

- **Modular Architecture:** Clean separation of concerns with dedicated modules for Products and Reviews.
- **Advanced Database Relations:**
  - `Product` ↔ `Title` (One-to-One)
  - `Product` ↔ `Reviews` (One-to-Many with Cascade Delete)
  - `Product` ↔ `Tags` (Many-to-Many)
- **Global Database Service:** A centralized `DatabaseModule` exporting a Prisma instance for use across the entire app.
- **Modern Configuration:** Full support for Prisma 7 standard driver adapters and configuration files.

---

## 🚀 Getting Started

### 1. Prerequisite
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
PORT=3000
```

### 4. Database Setup
Sync your database with the Prisma schema and generate the client:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 🏃 Running the App

```bash
# Development (with watch mode)
npm run start:dev

# Production Build
npm run build

# Run Production
npm run start:prod
```

---

## 📂 Project Structure

```text
src/
├── database/        # Global Prisma service & adapter config
├── products/        # Product management (CRUD + Relations)
├── reviwes/         # Review & feedback management
├── app.module.ts    # Main entry module
└── main.ts          # Application bootstrap
```

---

## 📡 API Endpoints Summary

### Products
- `POST /products` - Create a new product (with relations)
- `GET /products` - Get all products (includes title, reviews, tags)
- `GET /products/:id` - Get unique product details
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product (cascade deletes reviews/titles)

### Reviews
- `POST /reviwes` - Create a review
- `GET /reviwes` - Get all reviews
- `DELETE /reviwes/:id` - Remove a review

---

## 📜 License
This project is [UNLICENSED](LICENSE).
