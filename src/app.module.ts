import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [ProfilesModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
