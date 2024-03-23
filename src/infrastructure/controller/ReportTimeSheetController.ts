import { ReportRequestDTO } from '../../core/application/dto/ReportRequestDTO';
import { ReportUseCase } from '../../core/application/usecase/ReportUseCase';
import { MessageProducer } from '../adapters/external/MessageProducer';
import ReportGateway from "../adapters/gateway/ReportGateway";

export class ReportTimeSheetController {

  public static async generateReport(
    reportRequestDTO: ReportRequestDTO,
    messageProducer: MessageProducer
  ): Promise<void> {
    await ReportUseCase.generateReport(
      reportRequestDTO,
      new ReportGateway(),
      messageProducer,
    );
  }
}
