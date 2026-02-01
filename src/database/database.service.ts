import 'dotenv/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    // If running in Cloudflare Workers, we might have access to environment variables
    // In local development, we use process.env.DATABASE_URL from dotenv.
    const connectionString = (globalThis as any).process?.env?.DATABASE_URL || process.env.DATABASE_URL;

    if (!connectionString) {
      console.warn('⚠️ DATABASE_URL not found in environment. Database connection may fail.');
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.error('❌ Failed to connect to database:', error.message);
    }
  }
}
