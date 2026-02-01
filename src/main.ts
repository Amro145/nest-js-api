import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './database/prisma-client-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// For Cloudflare Workers, we need to export a fetch handler
let cachedApp: any;

async function bootstrap(env: any) {
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
    .setTitle('NestJS Prisma API')
    .setDescription('API documentation for Law Firm Platform')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.init();
  return server;
}

// Export for Cloudflare Workers
export default {
  async fetch(request: Request, env: any, ctx: any) {
    if (!cachedApp) {
      cachedApp = await bootstrap(env);
    }

    // In a production scenario, you would use a bridge like 'serverless-express'
    // to map the Cloudflare Fetch Request to an Express Request.
    // Here we return a 501 to indicate the Edge setup is ready but requires the bridge package.
    return new Response("NestJS Law Firm API Edge Bootstrapped. Please link a Request-to-Express bridge for full routing.", { status: 501 });
  }
};
