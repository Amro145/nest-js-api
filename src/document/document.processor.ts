import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor('document-processing')
export class DocumentProcessor extends WorkerHost {
    private readonly logger = new Logger(DocumentProcessor.name);

    async process(job: Job<any, any, string>): Promise<any> {
        const { documentId, fileName } = job.data;

        this.logger.log(`🏗️ Starting background processing for Document ID: ${documentId}`);

        // Task A: PDF Compression Simulation
        this.logger.log(`📉 Compressing [${fileName}]...`);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate work

        // Task B: OCR Classification Simulation
        this.logger.log(`🔍 Running OCR Classification on [${fileName}]...`);
        await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate more work

        const classifications = ['Power of Attorney', 'Legal Claim', 'Evidence', 'Contract'];
        const result = classifications[Math.floor(Math.random() * classifications.length)];

        this.logger.log(`✅ Classification complete: [${fileName}] identified as "${result}"`);

        return { success: true, classification: result };
    }
}
