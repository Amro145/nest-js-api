import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { ReviwesModule } from './reviwes/reviwes.module';

@Module({
  imports: [DatabaseModule, ProductsModule, ReviwesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
