import { Module } from '@nestjs/common';
import { ReviwesService } from './reviwes.service';
import { ReviwesController } from './reviwes.controller';

@Module({
  controllers: [ReviwesController],
  providers: [ReviwesService],
})
export class ReviwesModule {}
