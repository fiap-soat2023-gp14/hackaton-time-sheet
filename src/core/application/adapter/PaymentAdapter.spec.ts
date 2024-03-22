import { ReportRequestDTO } from '../dto/ReportRequestDTO';
import ReportRequestAdapter from './ReportRequestAdapter';
import { PaymentMock } from '../../../infrastructure/mocks/PaymentMock';

describe('PaymentAdapter', () => {
  describe('toDomain', () => {
    it('should convert PaymentFeedbackDTO to PaymentFeedback domain object', async () => {
      // Arrange
      const paymentFeedbackDTO: ReportRequestDTO =
        PaymentMock.getPaymentFeedback();
      // Act
      const result: PaymentFeedback = await ReportRequestAdapter.toDomain(
        paymentFeedbackDTO,
      );

      // Assert
      expect(result).toEqual({
        type: 'payment',
        status: 'approved',
        orderId: 'pay-10',
      });
    });
  });
});
