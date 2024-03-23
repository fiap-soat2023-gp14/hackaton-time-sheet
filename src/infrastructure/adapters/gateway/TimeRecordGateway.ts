import { IConnection } from '../external/IConnection';
import { ITimeRecordGateway } from '../../../core/application/repositories/ITimeRecordGateway';
import { TimeRecord } from '../../../core/domain/entities/TimeRecord';
import { TimeRecordMapper } from './mappers/TimeRecordMapper';
import DateUtils from 'src/infrastructure/DataUtils';
import { RecordFilter } from 'src/core/domain/entities/RecordFilter';

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
      return Promise.resolve(TimeRecordMapper.toDomain(timeRecordEntity));
    } catch (error) {
      console.error('Error creating record:', error);
      throw error;
    }
  }

  async getAllByEmployeeId(employeeId: string, params?: RecordFilter): Promise<TimeRecord[]> {
    const filter = params || {};

    let query = {
      "employeeId": employeeId
    } as any;

    if (filter.startDate) {
      query.record = { $gte: DateUtils.generateStartDate(new Date(params.startDate)) }
    }

    if (filter.endDate) {
      if (query.record) {
        query.record = { ...query.record, $lt: DateUtils.generateEndDate(params.endDate) }
      }
    }

    try {
      const dayRecord = await this.dbConnection
        .getCollection(this.COLLECTION_NAME)
        .find(query)
        .toArray();

      return Promise.resolve(TimeRecordMapper.toDomainList(dayRecord));

    } catch (error) {
      console.error('Error to get record data:', error);
      throw error;
    }


  }
}
