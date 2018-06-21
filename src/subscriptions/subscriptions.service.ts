import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { execute, subscribe } from 'graphql';
import * as http from 'http';
import * as https from 'https';
import { ServerOptions, SubscriptionServer } from 'subscriptions-transport-ws';
import * as WebSocket from 'ws';
import { SUBSCRIPTION_SERVER } from './subscription.constants';

@Injectable()
export default class SubscriptionsService implements OnModuleDestroy {
  private subscriptionServer!: SubscriptionServer;

  constructor(@Inject(SUBSCRIPTION_SERVER) private readonly ws: http.Server | https.Server) {}

  public createSubscriptionServer(
    schema: any,
    options?: ServerOptions,
    socketOptions?: WebSocket.ServerOptions
  ) {
    this.subscriptionServer = new SubscriptionServer(
      {
        execute,
        schema,
        subscribe,
        ...options,
      },
      {
        path: '/subscriptions',
        server: this.ws,
        ...socketOptions,
      }
    );
  }

  public onModuleDestroy() {
    this.ws.close();
  }
}
