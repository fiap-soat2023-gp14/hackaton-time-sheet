import { ReportRequestDTO } from '../dto/ReportRequestDTO';
import {MessageProducer} from "../../../infrastructure/adapters/external/MessageProducer";

export interface IReportGateway {
  generateReport(
      reportRequestDTO: ReportRequestDTO,
    messageProducer: MessageProducer,
  ): Promise<void>;
}
