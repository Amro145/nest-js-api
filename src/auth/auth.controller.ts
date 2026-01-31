import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() data: Prisma.AuthCreateInput) {
    return this.authService.signUp(data);
  }

  @Post('sign-in')
  async signIn(@Body() data: Prisma.AuthCreateInput) {
    return this.authService.signIn(data);
  }

  @Post('log-out')
  async logOut() {
    return this.authService.logOut();
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() data: Prisma.AuthUpdateInput) {
    return this.authService.update(+id, data);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
