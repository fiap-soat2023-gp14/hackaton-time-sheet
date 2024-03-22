import { EmployeeId } from "../valueObjects/EmployeeId";

export class TimeRecord {
  id: string;
  employeeId: EmployeeId;
  record: Date;
}
