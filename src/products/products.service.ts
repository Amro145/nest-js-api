import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ProductsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly i18n: I18nService,
  ) { }
  @OnEvent('review.created')
  async handleReviewCreated(review: any) {
    const product = await this.databaseService.product.findUnique({
      where: { id: review.productId },
      include: {
        reviews: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }


    await this.databaseService.product.update({
      where: { id: review.productId },
      data: {
        name: "new name"
      }
    });
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
      // Example of using I18nService to throw a translated error
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
