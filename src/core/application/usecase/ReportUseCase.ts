import { IReportGateway } from '../repositories/IReportGateway';
import { ReportRequestDTO } from '../dto/ReportRequestDTO';
import { MessageProducer } from "../../../infrastructure/adapters/external/MessageProducer";

export class ReportUseCase {
  public static async generateReport(
    reportRequestDTO: ReportRequestDTO,
    reportGateway: IReportGateway,
    messageProducer: MessageProducer,
  ) {

    await reportGateway.generateReport(reportRequestDTO, messageProducer);
  }
}
