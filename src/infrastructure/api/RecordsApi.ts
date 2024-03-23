import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { TimeRecordCreationDTO } from 'src/core/application/dto/TimeRecordCreationDTO';
import { TimeRecordResponseDTO } from 'src/core/application/dto/TimeRecordResponseDTO';
import { RecordsController } from '../controller/RecordsController';
import { IConnection } from '../adapters/external/IConnection';
import { MessageProducer } from '../adapters/external/MessageProducer';
import { RecordFilter } from 'src/core/domain/entities/RecordFilter';

@Controller('time-sheet/records')
export default class RecordsApi {
  constructor(
    @Inject(IConnection) private readonly dbConnection: IConnection,
    private messageProducer: MessageProducer,
  ) { }

  @Get('/:employeeId')
  public async getDayRecords(
    @Res() response,
    @Param('employeeId') employeeId: string,
    @Query() params: RecordFilter,
  ): Promise<Array<TimeRecordResponseDTO>> {
    const recordsController = new RecordsController();
    const records = await recordsController.getDayRecords(
      employeeId,
      params,
      this.dbConnection,
    );
    return response.status(HttpStatus.OK).json(records);
  }

  @Post()
  public async createRecord(
    @Res() response,
    @Body() body: TimeRecordCreationDTO,
  ) {
    const recordsController = new RecordsController();
    const timeRecordResponseDTO = await recordsController.createRecord(
      body,
      this.dbConnection
    );
    return response.status(HttpStatus.OK).json(timeRecordResponseDTO);
  }

}
