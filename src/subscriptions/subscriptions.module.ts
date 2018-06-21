import { DynamicModule, Module } from '@nestjs/common';
import { main } from '../../settings';
import { createSubscriptionProviders } from './subscription.providers';
import SubscriptionsService from './subscriptions.service';

@Module({
  exports: [SubscriptionsService],
  providers: [SubscriptionsService],
})
export default class SubscriptionsModule {
  public static forRoot(port: number = main.subscriptionsPort): DynamicModule {
    const providers = createSubscriptionProviders(port);
    return {
      exports: [...providers],
      module: SubscriptionsModule,
      providers: [...providers],
    };
  }
}
