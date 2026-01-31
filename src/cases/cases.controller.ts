import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CasesService } from './cases.service';
import { Prisma } from '@prisma/client';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('cases')
@Controller('cases')
export class CasesController {
    constructor(private readonly casesService: CasesService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new case' })
    create(@Body() data: Prisma.CaseCreateInput) {
        return this.casesService.create(data);
    }

    @Get()
    @ApiOperation({ summary: 'Get all cases' })
    findAll() {
        return this.casesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a case by id' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.casesService.findOne(id);
    }
}
