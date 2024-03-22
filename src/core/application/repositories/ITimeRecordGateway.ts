import { TimeRecord } from '../../domain/entities/TimeRecord';

export interface ITimeRecordGateway {
  getAllByEmployeeId(employeeId: string, params?): Promise<TimeRecord[]>;
  create(order: TimeRecord): Promise<TimeRecord>;
}
