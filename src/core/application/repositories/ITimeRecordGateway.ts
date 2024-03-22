import { TimeRecord } from '../../domain/entities/TimeRecord';

export interface ITimeRecordGateway {
  getAllByEmployeeId(employeeId: string): Promise<TimeRecord[]>;
  create(order: TimeRecord): Promise<TimeRecord>;
}
