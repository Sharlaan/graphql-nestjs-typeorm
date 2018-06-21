import { Mutation, Query, Resolver } from '@nestjs/graphql';

import { IUser } from './interfaces/user.interface';
import UserEntity from './users.entity';
import UsersService from './users.service';

@Resolver('User')
export default class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query('getUsers')
  public async getUsers(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Query('getUser')
  public async getUser(obj: undefined, args: IUser): Promise<UserEntity | undefined> {
    const { uid } = args;
    return this.usersService.findOne(uid);
  }

  @Mutation('createUser')
  public async create(obj: undefined, args: { user: IUser }): Promise<UserEntity> {
    return this.usersService.create(args.user);
  }

  @Mutation('updateUser')
  public async updateUser(obj: undefined, args: { id: number; user: IUser }): Promise<any> {
    return this.usersService.update(args.id, args.user);
  }

  @Mutation('deleteUser')
  public async deleteUser(obj: undefined, args: { id: number }): Promise<any> {
    return this.usersService.delete(args.id);
  }
}
