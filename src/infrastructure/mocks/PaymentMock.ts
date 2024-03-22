import { ReportRequestDTO } from '../../core/application/dto/ReportRequestDTO';

export class PaymentMock {
  public static getPaymentFeedback(): ReportRequestDTO {
    const payment: ReportRequestDTO = {
      id: 'pay-10',
      type: 'payment',
      status: 'approved',
      data: { id: 'pay-10' },
    };
    return payment;
  }
}
