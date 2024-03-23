import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { MessageProducer } from '../adapters/external/MessageProducer';
import { ReportTimeSheetController } from "../controller/ReportTimeSheetController";
import { ReportRequestDTO } from "../../core/application/dto/ReportRequestDTO";

@Controller('time-sheet/reports/')
export default class RecordsApi {
  constructor(
    private messageProducer: MessageProducer,
  ) {}

  @Post()
  public async generateReport(
    @Res() response,
    @Body() body: ReportRequestDTO,
  ) {
    await ReportTimeSheetController.generateReport(body, this.messageProducer);
    return response.status(HttpStatus.ACCEPTED).json();
  }

}
