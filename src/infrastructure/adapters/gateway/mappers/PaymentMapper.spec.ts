import { PaymentMapper } from './PaymentMapper';
import { TimeRecord } from '../../../../core/domain/entities/TimeRecord';
import { OrderMock } from '../../../mocks/OrderMock';
import { ReportRequestDTO } from '../../../../core/application/dto/ReportRequestDTO';

describe('PaymentMapper', () => {
  describe('toPaymnent', () => {
    it('should return a PaymentFeedbackDTO object with correct values', async () => {
      // Arrange
      const order: TimeRecord = await OrderMock.getOrder();

      // Act
      const result: ReportRequestDTO = PaymentMapper.toPaymnent(order);

      // Assert
      expect(result.id).toBeDefined();
      expect(result.type).toBe('payment');
      expect(result.status).toBe('approved');
      expect(result.data).toEqual({ id: result.id });
    });

    it('should generate a unique id if the order does not have an id', async () => {
      // Arrange
      const order: TimeRecord = await OrderMock.getOrder();

      // Act
      const result: ReportRequestDTO = PaymentMapper.toPaymnent(order);

      // Assert
      expect(result.id).toBeDefined();
      expect(result.type).toBe('payment');
      expect(result.status).toBe('approved');
      expect(result.data).toEqual({ id: result.id });
    });
  });
});
