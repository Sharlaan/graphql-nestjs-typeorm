import { Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { IUser } from './../users/interfaces/user.interface';
import CatEntity from './cats.entity';
import CatsService from './cats.service';
import { ICat } from './interfaces/cat.interface';

const pubSub = new PubSub();

@Resolver('Cat')
export default class CatsResolvers {
  constructor(private readonly catsService: CatsService) {}

  @Query('getCats')
  public async getCats() {
    return this.catsService.findAll();
  }

  @Query('getCat')
  public async getCat(obj: undefined, args: ICat): Promise<CatEntity | undefined> {
    const { id } = args;
    return this.catsService.findOne(+id);
  }

  @Query('getCatsByUserId')
  public async getCatsByUserId(obj: undefined, args: IUser): Promise<CatEntity[]> {
    const { uid } = args;
    return this.catsService.findCatsByUserId(uid);
  }

  @Mutation('createCat')
  public async create(obj: undefined, args: ICat): Promise<CatEntity> {
    const createdCat = await this.catsService.create(args);
    pubSub.publish('catCreated', { catCreated: createdCat });
    return createdCat;
  }

  @Mutation('updateCat')
  public async updateCat(obj: undefined, args: { id: number; cat: ICat }): Promise<any> {
    return this.catsService.update(args.id, args.cat);
  }

  @Mutation('deleteCat')
  public async deleteCat(obj: undefined, args: { id: number }): Promise<any> {
    return this.catsService.delete(args.id);
  }

  @Subscription('catCreated')
  public catCreated() {
    return {
      subscribe: () => pubSub.asyncIterator('catCreated'),
    };
  }
}
