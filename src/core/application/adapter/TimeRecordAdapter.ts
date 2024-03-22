import {TimeRecordCreationDTO} from '../dto/TimeRecordCreationDTO';
import {TimeRecord} from "../../domain/entities/TimeRecord";
import {EmployeeId} from "../../domain/valueObjects/EmployeeId";
import {DailyRecordResponseDTO, TimeRecordResponseDTO} from "../dto/TimeRecordResponseDTO";
import {RecordType} from "../../domain/enums/RecordType";

export default class TimeRecordAdapter {
  static async toDomain(timeRecordCreationDTO: TimeRecordCreationDTO): Promise<TimeRecord> {
    return {
      id: null,
      employeeId: await EmployeeId.create(timeRecordCreationDTO.employeeId),
      record: timeRecordCreationDTO.record,
      type: RecordType.IN.valueOf() === timeRecordCreationDTO.type ? RecordType.IN : RecordType.OUT,
    };
  }

  static toDTO(timeRecord: TimeRecord): TimeRecordResponseDTO {
    return {
      employeeId: timeRecord.employeeId.value,
      timeSheet: null, // TODO
    };
  }

  private static itemToDTO(item: any): DailyRecordResponseDTO {
    return null; // TODO
  }

  static toDTOList(orders: Array<TimeRecord>) {
    return undefined;
  }
}
