import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLFactory, GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { graphiqlFastify, graphqlFastify } from 'apollo-server-fastify';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { db, main } from '../settings';

import CatsModule from './cats/cats.module';
import SubscriptionsModule from './subscriptions/subscriptions.module';
import SubscriptionsService from './subscriptions/subscriptions.service';
import UsersModule from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(db as PostgresConnectionOptions),
    SubscriptionsModule.forRoot(),
    UsersModule,
    CatsModule,
    GraphQLModule,
  ],
})
export class ApplicationModule implements NestModule {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly graphQLFactory: GraphQLFactory
  ) {}

  public configure(consumer: MiddlewareConsumer) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });
    this.subscriptionsService.createSubscriptionServer(schema);

    consumer
      .apply(
        graphiqlFastify({
          endpointURL: '/graphql',
          subscriptionsEndpoint: `ws://localhost:${main.subscriptionsPort}/subscriptions`,
        })
      )
      .forRoutes('/graphiql')
      .apply(graphqlFastify(req => ({ schema, rootValue: req })))
      .forRoutes('/graphql');
  }
}
