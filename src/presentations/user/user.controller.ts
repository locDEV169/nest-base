/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { GetAllUserUseCases } from 'src/applications/use-cases/getAllUsers.usecase';
import { CreateUserUseCases } from 'src/applications/use-cases/createUser.usecase';
import { UseCaseProxy } from 'src/infrastructures/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infrastructures/usecase-proxy/usecase-proxy.module';
import { CreateUserDto, GeUserByUserIdParamDTO } from './dto/create-user.dto';
import { GetUserUseCases } from '../../applications/use-cases/getUser.usecase';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UsecaseProxyModule.GET_ALL_USERS_USE_CASE)
    private readonly getUserUsecaseProxy: UseCaseProxy<GetAllUserUseCases>,
    @Inject(UsecaseProxyModule.CREATE_USER_USE_CASE)
    private readonly createUserUsecaseProxy: UseCaseProxy<CreateUserUseCases>,
    @Inject(UsecaseProxyModule.GET_USER_USE_CASE)
    private readonly getOneUserUsecaseProxy: UseCaseProxy<GetUserUseCases>,
  ) {}

  @Get('')
  async getAllUsers() {
    try {
      const result = await this.getUserUsecaseProxy.getInstance().execute();
      return {
        status: 'OK',
        code: 200,
        message: 'Get data success',
        data: result,
      };
    } catch (error) {}
  }

  @Get(':userId')
  async getUser(@Req() req: Request, @Param() params: GeUserByUserIdParamDTO) {
    const id = params.userId;

    return await this.getOneUserUsecaseProxy
      .getInstance()
      .executeGetOneUser(id);
  }

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.createUserUsecaseProxy.getInstance().execute({
      email: email,
      name: name,
      password: hashedPassword,
    });
    return {
      status: 'Created',
      code: 201,
      message: 'Insert data success',
      data: result,
    };
  }
}
