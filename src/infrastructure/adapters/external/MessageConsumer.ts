import { Inject, Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from '@aws-sdk/client-sqs';
import { config } from '../../config';
import { MessageProducer } from './MessageProducer';
import {IConnection} from "./IConnection";
import TimeRecordGateway from "../gateway/TimeRecordGateway";
import TimeSheetUseCase from "../../../core/application/usecase/TimeSheetUseCase";
import {OrderStatus} from "../../../core/domain/enums/OrderStatus";



@Injectable()
export class MessageHandler {

    constructor( private  messageProducer: MessageProducer, @Inject(IConnection) private readonly dbConnection: IConnection) { }

    @SqsMessageHandler(config.AWS_PEDIDOS_RESPONSE_QUEUE, false)
    async handleMessage(message: AWS.Message) {
        const gateway = new TimeRecordGateway(this.dbConnection);
        console.log('body', message.Body);
        const data = JSON.parse(message.Body);

        console.log('data', data);

        await TimeSheetUseCase.updateOrder(data.id, OrderStatus[ data.status], gateway);
    }
}
