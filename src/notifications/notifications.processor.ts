import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor('case-notifications')
export class NotificationProcessor extends WorkerHost {
    private readonly logger = new Logger(NotificationProcessor.name);

    async process(job: Job<any, any, string>): Promise<any> {
        switch (job.name) {
            case 'send-welcome-email': {
                const { caseId, clientName } = job.data;

                this.logger.log(`🔄 Processing welcome email for Case ID: ${caseId}, Client: ${clientName}...`);

                // Simulating 5 seconds delay (mocking heavy task)
                await new Promise(resolve => setTimeout(resolve, 5000));

                this.logger.log(`✅ Welcome email sent successfully for Case ID: ${caseId}`);
                break;
            }

            default:
                this.logger.warn(`Unknown job name: ${job.name}`);
        }
    }
}
