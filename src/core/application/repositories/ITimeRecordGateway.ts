import { RecordFilter } from 'src/core/domain/entities/RecordFilter';
import { TimeRecord } from '../../domain/entities/TimeRecord';

export interface ITimeRecordGateway {
  getAllByEmployeeId(employeeId: string, params: RecordFilter): Promise<TimeRecord[]>;
  create(order: TimeRecord): Promise<TimeRecord>;
}
