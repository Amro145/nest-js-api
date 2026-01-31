import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { DatabaseModule } from 'src/database/database.module';
import { BullModule } from '@nestjs/bullmq';
import { DocumentProcessor } from './document.processor';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'document-processing',
    }),
  ],
  controllers: [DocumentController],
  providers: [DocumentService, DocumentProcessor],
})
export class DocumentModule { }
