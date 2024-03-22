import { TimeRecord } from 'src/core/domain/entities/TimeRecord';
import { ITimeRecordGateway } from '../repositories/ITimeRecordGateway';

export default class TimeSheetUseCase {

  public static async getAllRecordsByEmployeeId(
    employeeId: string,
    params: any,
    gateway: ITimeRecordGateway,
  ): Promise<Array<TimeRecord>> {

    return await gateway.getAllByEmployeeId(employeeId, params);
  }

  public static async createRecord(
    timeRecord: TimeRecord,
    timeRecordGateway: ITimeRecordGateway,
  ): Promise<TimeRecord> {

    return await timeRecordGateway.create(timeRecord);
  }
}
