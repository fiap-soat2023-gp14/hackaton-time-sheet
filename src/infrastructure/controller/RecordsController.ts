import TimeRecordAdapter from 'src/core/application/adapter/TimeRecordAdapter';
import { TimeRecordCreationDTO } from 'src/core/application/dto/TimeRecordCreationDTO';
import { TimeRecordResponseDTO } from 'src/core/application/dto/TimeRecordResponseDTO';
import { IConnection } from 'src/infrastructure/adapters/external/IConnection';
import TimeSheetUseCase from 'src/core/application/usecase/TimeSheetUseCase';
import TimeRecordGateway from '../adapters/gateway/TimeRecordGateway';
import { ITimeRecordGateway } from '../../core/application/repositories/ITimeRecordGateway';

export class RecordsController {
  public async createOrder(
    timeRecordCreationDTO: TimeRecordCreationDTO,
    dbConnection: IConnection,
  ): Promise<TimeRecordResponseDTO> {
    const timeRecordGateway: ITimeRecordGateway = new TimeRecordGateway(dbConnection);
    const timeRecordToCreate = await TimeRecordAdapter.toDomain(timeRecordCreationDTO);
    const createdTimeRecord = await TimeSheetUseCase.createRecord(
      timeRecordToCreate,
      timeRecordGateway,
    );
    return TimeRecordAdapter.toDTO(createdTimeRecord);
  }

  public async getAllOrders(
    employeeId: string,
    dbConnection: IConnection,
  ): Promise<Array<TimeRecordResponseDTO>> {
    const gateway = new TimeRecordGateway(dbConnection);
    const orders = await TimeSheetUseCase.getAllRecordsByEmployeeId(employeeId, gateway);

    return TimeRecordAdapter.toDTOList(orders);
  }

}
