import {Module} from '@nestjs/common';
import {SqsModule} from '@ssut/nestjs-sqs';
import {MessageProducer} from './MessageProducer';
import * as AWS from 'aws-sdk';
import {config} from '../../config';
import {IConnection} from "./IConnection";
import {MongoConnection} from "./MongoConnection";

@Module({
    imports: [
        SqsModule.register({
            producers: [
                {
                    name: config.AWS_REPORTS_QUEUE, // name of the queue
                    queueUrl: config.AWS_REPORTS_QUEUE_URL,
                    region: config.AWS_REGION, // url of the queue
                },
            ],
        }),
    ],
    controllers: [],
    providers: [
        MessageProducer,
        {
            provide: IConnection,
            useClass: MongoConnection,
        },
    ],

    exports: [MessageProducer]
})
export class QueuesModule {
}