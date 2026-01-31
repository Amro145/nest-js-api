import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ReviwesService {
  constructor(private readonly databaseService: DatabaseService, private readonly eventEmitter: EventEmitter2) {}
  async create(createReviewDto: Prisma.ReviewsCreateInput) {
    
    const review = await this.databaseService.reviews.create({ data: createReviewDto });
    this.eventEmitter.emit('review.created', review);
    return review;
  }

  async findAll() {
    return this.databaseService.reviews.findMany({
      include: {
        product: true,
      },
    });
  }

  findOne(id: number) {
    return this.databaseService.reviews.findUnique({
      where: { id },
      include: {
        product: true,
      },
    });
  }

  update(id: number, updateReviewDto: Prisma.ReviewsUpdateInput) {
    return this.databaseService.reviews.update({
      where: { id },
      data: updateReviewDto,
      include: {
        product: true,
      },
    });
  }

  remove(id: number) {
    return this.databaseService.reviews.delete({ where: { id } });
  }
}
