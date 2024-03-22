import { v4 } from 'uuid';
import { TimeRecord } from '../../../../core/domain/entities/TimeRecord';
import { ReportRequestDTO } from '../../../../core/application/dto/ReportRequestDTO';

export class PaymentMapper {
  static toPaymnent(order: TimeRecord): ReportRequestDTO {
    const id = order.id || v4();
    return {
      id: id,
      type: 'payment',
      status: 'approved',
      data: { id: id },
    };
  }
}
