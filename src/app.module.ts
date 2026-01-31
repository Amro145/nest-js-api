import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { ReviwesModule } from './reviwes/reviwes.module';

@Module({
  imports: [ProfilesModule, PostsModule, DatabaseModule, ProductsModule, ReviwesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
