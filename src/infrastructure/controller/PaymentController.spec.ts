import { PaymentController } from './PaymentController';
import { ReportRequestMock } from '../mocks/ReportRequestMock';
import { ReportRequestDTO } from '../../core/application/dto/ReportRequestDTO';
import { IReportGateway } from '../../core/application/repositories/IReportGateway';
import PaymentGateway from '../adapters/gateway/PaymentGateway';
import { ReportUseCase } from '../../core/application/usecase/ReportUseCase';
import {MessageProducer} from "../adapters/external/MessageProducer";
import {Test, TestingModule} from "@nestjs/testing";

jest.mock('../../core/application/usecase/ReportUseCase');
jest.mock('../adapters/external/MessageProducer');

jest.mock('@ssut/nestjs-sqs', () => ({
  SqsService: jest.fn().mockImplementation(() => ({
    send: jest.fn().mockResolvedValue({}), // Adjust behavior as needed
  })),
}));

describe('PaymentController', () => {
  let messageProducer: MessageProducer;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageProducer],
    }).compile();

    messageProducer = module.get<MessageProducer>(MessageProducer);
  });
  describe('receivePaymentFeedback', () => {
    it('should call PaymentUseCase.processPayment with the correct arguments', async () => {
      // Arrange
      const paymentFeedbackDTO: ReportRequestMock =
        ReportRequestDTO.getPaymentFeedback();
      const oauthToken = 'valid-token';
      const paymentGateway: IReportGateway = new PaymentGateway();

      await PaymentController.receivePaymentFeedback(
        paymentFeedbackDTO,
        paymentGateway, messageProducer,
      );

      // Assert
      expect(ReportUseCase.processPayment).toHaveBeenCalledWith(
        paymentFeedbackDTO,
        paymentGateway,
        messageProducer,
      );
    });
  });
});
