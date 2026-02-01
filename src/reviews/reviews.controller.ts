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
import { ReviewsService } from './reviews.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { UserPayload } from 'src/auth/interfaces/user-payload.interface';

interface RequestWithUser extends Request {
  user: UserPayload;
}

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createReviewDto: Prisma.ReviewsCreateInput, @Req() req: RequestWithUser) {
    const user = req.user;
    return this.reviewsService.create({
      ...createReviewDto,
      user: { connect: { id: user.sub } }
    });
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: Prisma.ReviewsUpdateInput,
    @Req() req: RequestWithUser
  ) {
    const user = req.user;
    const review = await this.reviewsService.findOne(+id);

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    // Authorization check: Only ADMIN or the OWNER can update the review
    if (user.role !== 'ADMIN' && review.userId !== user.sub) {
      throw new UnauthorizedException('You are not authorized to update this review');
    }

    return this.reviewsService.update(+id, updateReviewDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const user = req.user;
    const review = await this.reviewsService.findOne(+id);

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    // Authorization check: Only ADMIN or the OWNER can delete the review
    if (user.role !== 'ADMIN' && review.userId !== user.sub) {
      throw new UnauthorizedException('You are not authorized to delete this review');
    }

    return this.reviewsService.remove(+id);
  }
}
