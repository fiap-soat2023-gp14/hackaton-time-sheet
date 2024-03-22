import ReportRequestAdapter from 'src/core/application/adapter/ReportRequestAdapter';
import { MessageHandler } from './MessageConsumer';
import { MessageProducer } from './MessageProducer';
import { Test, TestingModule } from '@nestjs/testing';
import {IConnection} from "./IConnection";
import {MongoConnection} from "./MongoConnection";
import TimeSheetUseCase from "../../../core/application/usecase/TimeSheetUseCase";
import {OrderStatus} from "../../../core/domain/enums/OrderStatus";

 // Assuming it's in the same directory
jest.mock('./MessageProducer'); // Mock MessageProducer to avoid external calls
jest.mock('src/core/application/adapter/ReportRequestAdapter'); // Mock PaymentAdapter to isolate its behavior
jest.mock('src/core/application/usecase/TimeSheetUseCase'); // Mock PaymentUseCase to focus on MessageHandler logic

describe('MessageHandler', () => {
    let messageHandler: MessageHandler;
    let messageProducer: MessageProducer;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [MessageProducer,MessageHandler,{
                provide: IConnection,
                useClass: MongoConnection,
            },],
          }).compile();

          messageProducer = module.get<MessageProducer>(MessageProducer);
          messageHandler = module.get<MessageHandler>(MessageHandler);
    });

    it('should handle a message successfully', async () => {
        // Set up test data
        const messageBody = '{"paymentId": 123, "status": "APPROVED"}';

        // Mock external functions
        (ReportRequestAdapter.toDomain as jest.Mock).mockResolvedValueOnce({
            paymentId: 123,
            status: 'APPROVED'
        });
        (TimeSheetUseCase.updateOrder as jest.Mock).mockResolvedValueOnce({});

        // Create a mock AWS.Message object
        const message= { Body: messageBody };

        // Call the handleMessage method
        await messageHandler.handleMessage(message);

        // Assert expected behavior
        expect(TimeSheetUseCase.updateOrder).toHaveBeenCalledTimes(1);
    });
});
