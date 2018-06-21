import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersModule from '../users/users.module';
import CatEntity from './cats.entity';
import CatsResolvers from './cats.resolvers';
import CatsService from './cats.service';

@Module({
  exports: [CatsService],
  imports: [TypeOrmModule.forFeature([CatEntity]), forwardRef(() => UsersModule)],
  providers: [CatsService, CatsResolvers],
})
export default class CatsModule {}
