import { ReportRequestDTO } from '../dto/ReportRequestDTO';
import { MessageProducer } from "../../../infrastructure/adapters/external/MessageProducer";

export interface IReportGateway {
  generateReport(
    eportRequestDTO: ReportRequestDTO,
    messageProducer: MessageProducer,
  ): Promise<void>;
}
