import { EmployeeId } from "../../../../core/domain/valueObjects/EmployeeId";
import {RecordTypeEntity} from "../enums/RecordTypeEntity";

export class TimeRecordEntity {
  _id: string;
  employeeId: string;
  record: Date;
  type: RecordTypeEntity;
}