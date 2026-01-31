import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) { }

  async signUp(data: Prisma.AuthCreateInput) {
    const { userName, email, password } = data;

    // Check if user already exists
    const existingUser = await this.databaseService.auth.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.databaseService.auth.create({
      data: {
        userName,
        email,
        password: hashedPassword,
      },
    });

    // Remove password from returned object
    const { password: _password, ...result } = user;
    return result;
  }

  async signIn(data: Prisma.AuthCreateInput) {
    const { email, password } = data;

    const user = await this.databaseService.auth.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      userName: user.userName,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        userName: user.userName,
      },
    };
  }

  logOut() {
    return { message: 'Signed out successfully' };
  }

  async findAll() {
    return this.databaseService.auth.findMany({
      select: {
        id: true,
        userName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.databaseService.auth.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    const { password: _password, ...result } = user;
    return result;
  }

  async update(id: number, data: Prisma.AuthUpdateInput) {
    if (data.password && typeof data.password === 'string') {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const user = await this.databaseService.auth.update({
      where: { id },
      data,
    });

    const { password: _password, ...result } = user;
    return result;
  }

  async remove(id: number) {
    return this.databaseService.auth.delete({
      where: { id },
    });
  }
}
