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

@Controller('time-sheet/records/')
export default class RecordsApi {
  constructor(
    @Inject(IConnection) private readonly dbConnection: IConnection,
  ) {}

  @Get(':employeeId')
  public async getAllOrders(
    @Res() response,
    @Param('employeeId') employeeId: string,
  ): Promise<Array<TimeRecordResponseDTO>> {
    const recordsController = new RecordsController();
    const records = await recordsController.getAllOrders(
        employeeId,
      this.dbConnection,
    );
    return response.status(HttpStatus.OK).json(records);
  }

  @Post()
  public async createOrder(
    @Res() response,
    @Body() body: TimeRecordCreationDTO,
  ) {
    const recordsController = new RecordsController();
    const timeRecordResponseDTO = await recordsController.createOrder(
      body,
      this.dbConnection
    );
    return response.status(HttpStatus.OK).json(timeRecordResponseDTO);
  }

}
