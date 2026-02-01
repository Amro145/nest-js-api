# ⚖️ Smart Law Firm Platform - Backend Core

A high-performance, enterprise-grade backend system designed for modern law firms. This platform orchestrates case management, billing automation, secure document handling, and client lifecycle management using a decoupled, event-driven architecture.

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="80" alt="Nest Logo" />
  <img src="https://raw.githubusercontent.com/prisma/github-assets/master/logo.png" width="80" alt="Prisma Logo" />
  <img src="https://redis.io/wp-content/uploads/2024/04/Logotype.svg" width="80" alt="Redis Logo" />
</p>

---

## 🛠 Technical Stack

- **Core Framework:** [NestJS](https://nestjs.com/) (Modular, Guards, Interceptors, Versioning)
- **Language:** [TypeScript](https://www.typescript.org/) (Strict Mode)
- **ORM & Database:** [Prisma](https://www.prisma.io/) with **PostgreSQL** (Optimized with Indexing & Partitioning)
- **Security:** JWT Authentication, CORS, Bcrypt Hashing, and Rate Limiting
- **Background Tasks:** [BullMQ](https://docs.bullmq.io/) with **Redis** for robust Job Queuing
- **Real-time & Events:** `@nestjs/event-emitter` for decoupled lifecycle logic
- **Localization:** `nestjs-i18n` (Multi-language support: AR/EN)
- **API Specification:** [Swagger/OpenAPI 3.0](https://swagger.io/)

---

## 🏗 Modular Architecture

The system follows a highly modular design pattern to ensure scalability and maintainability:

```text
src/
├── auth/          # Secure Authentication & RBAC (Admin, Lawyer, Client)
├── cases/         # Case Lifecycle & Assignment Logic
├── document/      # Secure File Uploads with Cloud Storage Integration
├── reviews/       # Internal & External Feedback Loops
├── products/      # Service & Legal Package Management
├── notifications/ # Background Job Processors (Email/SMS/Push)
├── database/      # Global Prisma Connection & Logic
└── i18n/          # Language Dictionary (AR/EN Support)
```

---

## ✨ Key Features

- **📊 Management Dashboard:** Real-time metrics and case status tracking.
- **📁 Case Lifecycle Management:** Complete workflow from intake to settlement.
- **👤 Client Creation:** 360-degree client profiles with secure portal access.
- **☁️ Secure Document Handling:** Upload and manage legal documents with cloud storage (S3/R2) and signed URL access.
- **🤖 Automation Rules:** Event-driven notification triggers (e.g., Welcome emails on Case creation).

---

## 🔒 Security & Performance

- **Postgres Indexing:** High-use fields (Emails, Case IDs, Foreign Keys) are indexed to ensure sub-millisecond query performance as records grow.
- **Redis Caching:** Integrated Redis caching layer for rapid access to frequently requested resources and rate limiting protection.
- **Bcrypt Security:** Passwords are never stored in plain text, utilizing high-entropy salt rounds for hashing.
- **RBAC:** Fine-grained Role-Based Access Control to protect sensitive legal data.

---

## 🚀 Installation Guide (Ubuntu)

### 1. Prerequisites
- Node.js (v20+)
- PostgreSQL (v14+)
- Redis Server (v6+)

### 2. Setup Database & Redis
```bash
sudo apt update
sudo apt install postgresql redis-server
sudo systemctl start postgresql redis-server
```

### 3. Clone & Install
```bash
git clone https://github.com/Amro145/nest-js-api.git
cd nest-js-api
npm install
```

### 4. Environment Configuration
Create a `.env` file in the root:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/lawfirm_db?schema=public"
JWT_SECRET="your_secure_secret"
REDIS_HOST="localhost"
REDIS_PORT=6379
```

### 5. Initialize Prisma
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 📖 API Documentation

The platform comes with built-in Swagger documentation. Once the server is running, you can access the interactive API explorer at:

👉 **[http://localhost:3000/api](http://localhost:3000/api)**

---

## 🏃 Running the Platform

```bash
# Development mode
npm run start:dev

# Production Build
npm run build
npm run start:prod
```

---

## 📜 License
This project is [UNLICENSED](LICENSE).
