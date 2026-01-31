import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { NotificationProcessor } from './notifications.processor';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'case-notifications',
        }),
    ],
    providers: [NotificationProcessor],
    exports: [BullModule], // Export BullModule so other modules can inject the queue
})
export class NotificationsModule { }
