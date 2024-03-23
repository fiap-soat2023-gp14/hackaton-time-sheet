import { TimeRecord } from 'src/core/domain/entities/TimeRecord';
import { ITimeRecordGateway } from '../repositories/ITimeRecordGateway';
import { RecordFilter } from 'src/core/domain/entities/RecordFilter';

export default class TimeSheetUseCase {

  public static async getAllRecordsByEmployeeId(
    employeeId: string,
    params: RecordFilter,
    timeRecordGateway: ITimeRecordGateway,
  ): Promise<Array<TimeRecord>> {

    return await timeRecordGateway.getAllByEmployeeId(employeeId, params);
  }

  public static async createRecord(
    timeRecord: TimeRecord,
    timeRecordGateway: ITimeRecordGateway,
  ): Promise<TimeRecord> {

    return await timeRecordGateway.create(timeRecord);
  }
}
