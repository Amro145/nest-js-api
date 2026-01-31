import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CasesService {
    private readonly logger = new Logger(CasesService.name);

    constructor(
        private readonly databaseService: DatabaseService,
        @InjectQueue('case-notifications') private readonly notificationQueue: Queue,
    ) { }

    async create(data: Prisma.CaseCreateInput) {
        try {
            // 1. Success Database Write
            const newCase = await this.databaseService.case.create({
                data,
            });

            this.logger.log(`📁 Case created in database with ID: ${newCase.id}`);

            // 2. Add Job to Queue immediately after
            await this.notificationQueue.add('send-welcome-email', {
                caseId: newCase.id,
                clientName: newCase.clientName,
            });

            this.logger.log(`📥 Added 'send-welcome-email' job to queue for Case ID: ${newCase.id}`);

            return newCase;
        } catch (error) {
            this.logger.error(`❌ Failed to create case: ${error.message}`);
            throw new InternalServerErrorException('Error creating case and triggers');
        }
    }

    async findAll() {
        return this.databaseService.case.findMany();
    }

    async findOne(id: number) {
        return this.databaseService.case.findUnique({
            where: { id },
        });
    }
}
