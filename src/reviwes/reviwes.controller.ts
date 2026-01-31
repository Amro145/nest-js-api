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
} from '@nestjs/common';
import { ReviwesService } from './reviwes.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('reviwes')
@Controller('reviwes')
export class ReviwesController {
  constructor(private readonly reviwesService: ReviwesService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createReviweDto: Prisma.ReviewsCreateInput, @Req() req: Request) {
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
  update(
    @Param('id') id: string,
    @Body() updateReviweDto: Prisma.ReviewsUpdateInput,
    @Req() req: Request
  ) {
    const userId = (req as any).user.sub;
    return this.reviwesService.update(+id, updateReviweDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviwesService.remove(+id);
  }
}
