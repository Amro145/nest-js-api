import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { ReviwesService } from './reviwes.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@ApiTags('reviwes')
@Controller('reviwes')
export class ReviwesController {
  constructor(private readonly reviwesService: ReviwesService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createReviweDto: Prisma.ReviewsCreateInput, @Req() req: Request) {
    const userId = (req as any).user.sub;
    return this.reviwesService.create({
      ...createReviweDto,
      user: { connect: { id: userId } }
    });
  }

  @Get()
  findAll() {
    return this.reviwesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviwesService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReviweDto: Prisma.ReviewsUpdateInput,
    @Req() req: Request
  ) {
    const userId = (req as any).user.sub;
    const userRole = (req as any).user.role;

    const review = await this.reviwesService.findOne(+id);

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    // Authorization check: Only ADMIN or the OWNER can update the review
    if (userRole !== 'ADMIN' && review.userId !== userId) {
      throw new UnauthorizedException('You are not authorized to update this review');
    }

    return this.reviwesService.update(+id, updateReviweDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).user.sub;
    const userRole = (req as any).user.role;

    const review = await this.reviwesService.findOne(+id);

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    // Authorization check: Only ADMIN or the OWNER can delete the review
    if (userRole !== 'ADMIN' && review.userId !== userId) {
      throw new UnauthorizedException('You are not authorized to delete this review');
    }

    return this.reviwesService.remove(+id);
  }
}
