import { v4 } from 'uuid';
import { TimeRecord } from '../../../../core/domain/entities/TimeRecord';
import { TimeRecordEntity } from '../entity/TimeRecordEntity';
import { RecordType } from "../../../../core/domain/enums/RecordType";
import { RecordTypeEntity } from "../enums/RecordTypeEntity";
import { EmployeeId } from "../../../../core/domain/valueObjects/EmployeeId";

export class TimeRecordMapper {
  static toEntity(timeRecord: TimeRecord): TimeRecordEntity {
    return {
      _id: timeRecord.id || v4(),
      employeeId: timeRecord.employeeId.value,
      record: timeRecord.record,
      type: RecordTypeEntity[timeRecord.type],
    };
  }

  static async toDomain(timeRecordEntity: TimeRecordEntity): Promise<TimeRecord> {
    return {
      id: timeRecordEntity._id,
      employeeId: await EmployeeId.create(timeRecordEntity.employeeId),
      record: timeRecordEntity.record,
      type: RecordType[timeRecordEntity.type],
    };
  }

  static async toDomainList(timeRecordList: TimeRecordEntity[]): Promise<TimeRecord[]> {
    return Promise.all(timeRecordList.map((record) => this.toDomain(record)));
  }
}
