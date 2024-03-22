import {EmployeeId} from "../valueObjects/EmployeeId";

export class ReportRequest {
    employeeId: EmployeeId;
    email: string; //TODO pegar email type do client e ver se crio os value object pra month e year
    month: string;
    year: string;
}