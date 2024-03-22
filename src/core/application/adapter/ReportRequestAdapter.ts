import { ReportRequestDTO } from '../dto/ReportRequestDTO';
import { ReportRequest } from "../../domain/entities/ReportRequest";
import { EmployeeId } from "../../domain/valueObjects/EmployeeId";

export default class ReportRequestAdapter {
  static async toDomain(
    reportRequestDTO: ReportRequestDTO,
  ): Promise<ReportRequest> {
    return {
      employeeId: await EmployeeId.create(reportRequestDTO.employeeId),
      email: reportRequestDTO.email,
      month: reportRequestDTO.month,
      year: reportRequestDTO.year
    };
  }
}
