import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { TimeRecordCreationDTO } from 'src/core/application/dto/TimeRecordCreationDTO';
import { TimeRecordResponseDTO } from 'src/core/application/dto/TimeRecordResponseDTO';
import { RecordsController } from '../controller/RecordsController';
import { IConnection } from '../adapters/external/IConnection';
import { MessageProducer } from '../adapters/external/MessageProducer';
import {ReportTimeSheetController} from "../controller/ReportTimeSheetController";
import {ReportRequestDTO} from "../../core/application/dto/ReportRequestDTO";

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
    const timeRecordResponseDTO = await ReportTimeSheetController.generateReport(
        body,
        this.messageProducer);
    return response.status(HttpStatus.ACCEPTED).json();
  }

}
