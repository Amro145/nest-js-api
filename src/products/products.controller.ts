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
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { UserPayload } from 'src/auth/interfaces/user-payload.interface';

interface RequestWithUser extends Request {
  user: UserPayload;
}

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createProductDto: Prisma.ProductCreateInput, @Req() req: RequestWithUser) {
    const user = req.user;

    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException('You are not authorized to create a product');
    }

    return this.productsService.create({
      ...createProductDto,
      user: { connect: { id: user.sub } }
    });
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: Prisma.ProductUpdateInput,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;
    const product = await this.productsService.findOne(+id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Authorization check: Only ADMIN or the OWNER can update the product
    if (user.role !== 'ADMIN' && product.userId !== user.sub) {
      throw new UnauthorizedException('You are not authorized to update this product');
    }

    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const user = req.user;
    const product = await this.productsService.findOne(+id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Authorization check: Only ADMIN or the OWNER can delete the product
    if (user.role !== 'ADMIN' && product.userId !== user.sub) {
      throw new UnauthorizedException('You are not authorized to delete this product');
    }

    return this.productsService.remove(+id);
  }
}
