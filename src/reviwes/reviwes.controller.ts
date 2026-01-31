import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviwesService } from './reviwes.service';
import { Prisma } from '@prisma/client';

@Controller('reviwes')
export class ReviwesController {
  constructor(private readonly reviwesService: ReviwesService) { }

  @Post()
  create(@Body() createReviweDto: Prisma.ReviewsCreateInput) {
    return this.reviwesService.create(createReviweDto);
  }

  @Get()
  findAll() {
    return this.reviwesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviwesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviweDto: Prisma.ReviewsUpdateInput) {
    return this.reviwesService.update(+id, updateReviweDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviwesService.remove(+id);
  }
}

