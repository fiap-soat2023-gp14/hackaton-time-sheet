import { IConnection } from '../external/IConnection';
import { ITimeRecordGateway } from '../../../core/application/repositories/ITimeRecordGateway';
import { TimeRecord } from '../../../core/domain/entities/TimeRecord';
import { TimeRecordEntity } from './entity/TimeRecordEntity';
import { TimeRecordMapper } from './mappers/TimeRecordMapper';

export default class TimeRecordGateway implements ITimeRecordGateway {
  COLLECTION_NAME = 'TimeRecords';
  private dbConnection: IConnection;
  constructor(database: IConnection) {
    this.dbConnection = database;
  }

  create(order: TimeRecord): Promise<TimeRecord> {
    //TODO IMPLEMENT
        throw new Error('Method not implemented.');
    }

  getAllByEmployeeId(employeeId: string, params?: any): Promise<TimeRecord[]> {
    //TODO IMPLEMENT
    throw new Error('Method not implemented.');
    }

}
