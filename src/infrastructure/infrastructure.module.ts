import { Module } from '@nestjs/common';

import ApplicationModule from '../core/application/application.module';
import RecordsApi from './api/RecordsApi';
import { MongoConnection } from './adapters/external/MongoConnection';
import { IConnection } from './adapters/external/IConnection';
import { QueuesModule } from './adapters/external/queues.module';

@Module({
  imports: [ApplicationModule, QueuesModule],
  controllers: [RecordsApi],
  providers: [
    {
      provide: IConnection,
      useClass: MongoConnection,
    },
  ],
})
export default class InfrastructureModule {}
