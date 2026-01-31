import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bullmq';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver
} from 'nestjs-i18n';
import * as path from 'path';

import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { ReviwesModule } from './reviwes/reviwes.module';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CasesModule } from './cases/cases.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'ar',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: HeaderResolver, options: ['x-lang'] },
        AcceptLanguageResolver,
        new QueryResolver(['lang']),
      ],
    }),
    DatabaseModule,
    ProductsModule,
    ReviwesModule,
    AuthModule,
    NotificationsModule,
    CasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
