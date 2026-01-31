import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let message = exception.message.replace(/\n/g, '');
        const status = this.getHttpStatus(exception.code);

        switch (exception.code) {
            case 'P2002': {
                const target = (exception.meta?.target as string[])?.join(', ') || 'field';
                message = `Unique constraint failed on the ${target}`;
                break;
            }
            case 'P2003': {
                const fieldName = (exception.meta?.field_name as string) || 'unknown field';
                message = `Foreign key constraint failed on the field: ${fieldName}`;
                break;
            }
            case 'P2025': {
                message = (exception.meta?.cause as string) || 'Record not found';
                break;
            }
            default:
                // For other Prisma codes, use the original message or a generic one
                break;
        }

        response.status(status).json({
            statusCode: status,
            message: message,
            error: this.getErrorType(status),
        });
    }

    private getHttpStatus(code: string): HttpStatus {
        switch (code) {
            case 'P2002':
                return HttpStatus.CONFLICT;
            case 'P2003':
                return HttpStatus.BAD_REQUEST;
            case 'P2025':
                return HttpStatus.NOT_FOUND;
            default:
                return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    private getErrorType(status: HttpStatus): string {
        switch (status) {
            case HttpStatus.CONFLICT:
                return 'Conflict';
            case HttpStatus.BAD_REQUEST:
                return 'Bad Request';
            case HttpStatus.NOT_FOUND:
                return 'Not Found';
            default:
                return 'Internal Server Error';
        }
    }
}