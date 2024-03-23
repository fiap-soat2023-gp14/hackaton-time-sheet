import { ReportRequestDTO } from "src/core/application/dto/ReportRequestDTO";
import { IReportGateway } from "../../../core/application/repositories/IReportGateway";
import { MessageProducer } from "../external/MessageProducer";

export default class ReportGateway implements IReportGateway {

    async generateReport(reportRequestDTO: ReportRequestDTO,
                   messageProducer: MessageProducer): Promise<void> {

        try {
            await messageProducer.sendMessage(reportRequestDTO);
        } catch (error) {
            throw new Error('Error requesting report');
        }
        return Promise.resolve();
    }
}