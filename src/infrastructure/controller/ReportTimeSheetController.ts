import { ReportRequestDTO } from '../../core/application/dto/ReportRequestDTO';
import { ReportUseCase } from '../../core/application/usecase/ReportUseCase';
import { IReportGateway } from '../../core/application/repositories/IReportGateway';
import { MessageProducer } from '../adapters/external/MessageProducer';

export class ReportTimeSheetController {

  public static async receiveReportFeedback(
    reportRequestDTO: ReportRequestDTO,
    reportGateway: IReportGateway,
    messageProducer: MessageProducer
  ): Promise<void> {
    await ReportUseCase.generateReport(
      reportRequestDTO,
      reportGateway,
      messageProducer,
    );
  }
}
