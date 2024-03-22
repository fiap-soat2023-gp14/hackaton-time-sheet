import { IReportGateway } from '../../../core/application/repositories/IReportGateway';
import { ReportRequestDTO } from '../../../core/application/dto/ReportRequestDTO';
import {MessageProducer} from "../external/MessageProducer";

export default class PaymentGateway implements IReportGateway {
  clusterUrl: string;
  constructor() {
    this.clusterUrl = process.env.CLUSTER_URL;
  }

  public async receivePaymentFeedback(
    paymentFeedbackDTO: ReportRequestDTO,
    messageProducer: MessageProducer,
  ): Promise<void> {

    try {
      await messageProducer.sendMessage(paymentFeedbackDTO);

    } catch (error) {
      throw new Error('Error receiving payment feedback');
    }
    return Promise.resolve();
  }
}
