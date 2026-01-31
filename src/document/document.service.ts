import { Injectable, Logger, ForbiddenException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class DocumentService {
  private readonly logger = new Logger(DocumentService.name);

  constructor(
    private readonly databaseService: DatabaseService,
    @InjectQueue('document-processing') private readonly documentQueue: Queue,
  ) { }

  async uploadDocument(
    file: Express.Multer.File,
    caseId: number,
    user: any,
    firmId?: string,
  ) {
    // 1. Authorization: Only Admin or Assigned Lawyer
    const existingCase = await this.databaseService.case.findUnique({
      where: { id: caseId },
      include: { assignedLawyer: true },
    });

    if (!existingCase) {
      throw new NotFoundException(`Case with ID ${caseId} not found`);
    }

    const isAdmin = user.role === 'ADMIN';
    const isAssignedLawyer = user.role === 'LAWYER' && existingCase.assignedLawyerId === user.sub;

    if (!isAdmin && !isAssignedLawyer) {
      throw new ForbiddenException('You are not authorized to upload documents for this case');
    }

    // 2. Persist Metadata
    // Note: In a real app, you would upload to S3/R2 first and get the URL
    // Here we simulate the URL
    const simulatedFileUrl = `https://storage.provider.com/firm-assets/${file.filename || Date.now()}-${file.originalname}`;

    const document = await this.databaseService.document.create({
      data: {
        fileName: file.originalname,
        fileUrl: simulatedFileUrl,
        fileType: file.mimetype,
        fileSize: file.size,
        caseId: caseId,
        firmId: firmId,
      },
    });

    this.logger.log(`📄 Document meta saved: ${document.fileName} (ID: ${document.id})`);

    // 3. Trigger Background Processing
    await this.documentQueue.add('process-document', {
      documentId: document.id,
      fileName: document.fileName,
    });

    this.logger.log(`📥 Added document ${document.id} to processing queue`);

    return document;
  }

  async findAll() {
    return this.databaseService.document.findMany();
  }

  async findOne(id: number) {
    const document = await this.databaseService.document.findUnique({
      where: { id },
    });
    if (!document) throw new NotFoundException('Document not found');
    return document;
  }

  async remove(id: number) {
    return this.databaseService.document.delete({ where: { id } });
  }
}
