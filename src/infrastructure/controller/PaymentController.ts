import { ReportRequestDTO } from '../../core/application/dto/ReportRequestDTO';
import { ReportUseCase } from '../../core/application/usecase/ReportUseCase';
import { IReportGateway } from '../../core/application/repositories/IReportGateway';
import { MessageProducer } from '../adapters/external/MessageProducer';

export class PaymentController {
  public static async receivePaymentFeedback(
    paymentFeedbackDTO: ReportRequestDTO,
    paymentGateway: IReportGateway,
    messageProducer: MessageProducer
  ): Promise<void> {
    await ReportUseCase.processPayment(
      paymentFeedbackDTO,
      paymentGateway,
      messageProducer,
    );
  }
}
