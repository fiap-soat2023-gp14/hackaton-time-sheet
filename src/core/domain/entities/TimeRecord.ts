import { EmployeeId } from "../valueObjects/EmployeeId";
import {RecordType} from "../enums/RecordType";

export class TimeRecord {
  id: string;
  employeeId: EmployeeId;
  record: Date;
  type: RecordType;
}
