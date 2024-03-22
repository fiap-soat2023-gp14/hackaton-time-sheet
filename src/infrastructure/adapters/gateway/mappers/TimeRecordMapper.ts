import {v4} from 'uuid';
import {TimeRecord} from '../../../../core/domain/entities/TimeRecord';
import {TimeRecordEntity} from '../entity/TimeRecordEntity';
import {RecordType} from "../../../../core/domain/enums/RecordType";
import {RecordTypeEntity} from "../enums/RecordTypeEntity";

export class TimeRecordMapper {
  static toEntity(timeRecord: TimeRecord): TimeRecordEntity {
    return {
      _id: timeRecord.id || v4(),
      employeeId: timeRecord.employeeId.value,
      record: timeRecord.record,
      type: timeRecord.type.valueOf() === RecordType.IN.valueOf()? RecordTypeEntity.IN : RecordTypeEntity.OUT,
    };
  }
}
