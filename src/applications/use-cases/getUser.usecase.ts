/* eslint-disable prettier/prettier */
import { UserM } from 'src/domains/model/user';
import { UserRepository } from 'src/domains/repositories/user.repository';

export class GetUserUseCases {
  constructor(private usersRepository: UserRepository) {}

  async executeGetOneUser(id: number | string): Promise<UserM> {
    return await this.usersRepository.getUsers(id);
  }
}
