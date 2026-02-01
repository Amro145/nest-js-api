import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './database/prisma-client-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// For Cloudflare Workers, we need to export a fetch handler
let cachedApp: any;

async function bootstrap(env?: any) {
  // Transfer Cloudflare Environment variables to process.env for Node compatibility
  if (env) {
    Object.keys(env).forEach(key => {
      if (typeof env[key] === 'string') {
        process.env[key] = env[key];
      }
    });
  }

  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle('NestJS Law Firm API')
    .setDescription('API documentation for Law Firm Platform')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // If we are in the Cloudflare Worker environment
  if (env) {
    await app.init();
    return server;
  }

  // Standard Local Development Mode
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📖 Swagger documentation: http://localhost:${process.env.PORT ?? 3000}/api`);
}

// Check if we are running in a standard Node environment (not Worker)
if (typeof process !== 'undefined' && process.env && !process.env.CLOUDFLARE_WORKER) {
  void bootstrap();
}

// Export for Cloudflare Workers
export default {
  async fetch(request: Request, env: any, ctx: any) {
    if (!cachedApp) {
      cachedApp = await bootstrap(env);
    }

    // Bridge placeholder remains - you'll need 'serverless-express' or similar to map the requests
    // However, the worker is now correctly bootstrapped
    return new Response("NestJS Law Firm API Edge Bootstrapped. Note: Full routing requires a Request-to-Express bridge adapter.", { status: 501 });
  }
};
