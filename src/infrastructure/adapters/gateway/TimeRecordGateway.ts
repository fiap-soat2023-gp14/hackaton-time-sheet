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

  async create(timeRecord: TimeRecord): Promise<TimeRecord> {
    const timeRecordEntity = TimeRecordMapper.toEntity(timeRecord);

    try {
      await this.dbConnection
          .getCollection(this.COLLECTION_NAME)
          .insertOne(timeRecordEntity);
      console.log('Time record created successfully.');
      return Promise.resolve(TimeRecordMapper.toDomain(timeRecordEntity));
    } catch (error) {
      console.error('Error creating record:', error);
      throw error;
    }
  }

  getAllByEmployeeId(employeeId: string, params?: any): Promise<TimeRecord[]> {
    //TODO IMPLEMENT
    throw new Error('Method not implemented.');
    }

}
