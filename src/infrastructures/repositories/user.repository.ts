/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/domains/repositories/user.repository';
import { PrismaService } from '../config/database/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepositoryOrm implements UserRepository {
  constructor(private readonly userRepository: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.user.findMany();
  }

  async getUsers(id: number): Promise<User | any> {
    try {
      const user = await this.userRepository.user.findFirstOrThrow({
        where: { id: Number(id) },
      });

      if (!user) {
        throw new NotFoundException(`User with does not exist.`);
      }

      return user;
    } catch (error) {
      return {
        status: error.code,
        message: error.message,
        errors: error,
        stack: error.stack,
      };
    }
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.userRepository.user.create({ data });
    return user;
  }
}
