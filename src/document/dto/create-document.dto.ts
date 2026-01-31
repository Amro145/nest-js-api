import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
    @ApiProperty({ description: 'The ID of the case this document belongs to' })
    @IsNotEmpty()
    @IsNumberString()
    caseId: string;

    @ApiProperty({ description: 'Optional Firm ID', required: false })
    @IsOptional()
    @IsString()
    firmId?: string;
}
