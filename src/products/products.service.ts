import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Prisma, Reviews } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly i18n: I18nService,
  ) { }

  @OnEvent('review.created')
  async handleReviewCreated(review: Reviews) {
    this.logger.log(`🔔 Review created for product ${review.productId}. Syncing stats...`);

    const product = await this.databaseService.product.findUnique({
      where: { id: review.productId },
    });

    if (!product) {
      this.logger.error(`❌ Product ${review.productId} not found during review.created event.`);
      return;
    }

    // Example logic: Update a "lastReviewedAt" or "averageRating" field if you add them to schema
    // For now, let's just log it or perform a sample update if needed.
    // We avoid hardcoding "new name" as it's a bad practice.
  }

  async create(createProductDto: Prisma.ProductCreateInput) {
    return this.databaseService.product.create({ data: createProductDto });
  }

  async findAll() {
    return this.databaseService.product.findMany({
      include: {
        title: true,
        reviews: true,
        tags: true,
        user: true,
      },
    });
  }

  async findOne(id: number) {
    const product = await this.databaseService.product.findUnique({
      where: { id },
      include: {
        title: true,
        reviews: true,
        tags: true,
        user: true,
      },
    });

    if (!product) {
      const message = this.i18n.t('common.PRODUCT_NOT_FOUND', {
        lang: I18nContext.current()?.lang,
      });
      throw new NotFoundException(message);
    }

    return product;
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return this.databaseService.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        title: true,
        reviews: true,
        tags: true,
        user: true,
      },
    });
  }

  async remove(id: number) {
    return this.databaseService.product.delete({ where: { id } });
  }
}
