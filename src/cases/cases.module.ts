import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, NotificationsModule],
    providers: [CasesService],
    controllers: [CasesController],
})
export class CasesModule { }
