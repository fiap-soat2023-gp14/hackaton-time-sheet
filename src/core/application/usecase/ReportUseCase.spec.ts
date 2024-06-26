import { ReportUseCase } from './ReportUseCase';
import { ReportRequestDTO } from '../dto/ReportRequestDTO';
import { ReportRequestMock } from '../../../infrastructure/mocks/ReportRequestMock';
import { IReportGateway } from '../repositories/IReportGateway';
import {MessageProducer} from "../../../infrastructure/adapters/external/MessageProducer";

jest.mock('../../../infrastructure/adapters/external/MessageProducer');
describe('PaymentUseCase', () => {
  let messageProducer: MessageProducer;

  describe('processPayment', () => {
    it('should call receivePaymentFeedback method of paymentGateway with the correct parameters', async () => {
      // TODO

    });
  });
});
