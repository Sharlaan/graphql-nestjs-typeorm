import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CatsModule from '../cats/cats.module';
import UserEntity from './users.entity';
import UsersResolvers from './users.resolvers';
import UsersService from './users.service';

@Module({
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(() => CatsModule)],
  providers: [UsersService, UsersResolvers],
})
export default class UsersModule {}
