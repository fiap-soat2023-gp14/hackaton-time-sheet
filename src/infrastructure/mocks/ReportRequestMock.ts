import { ReportRequestDTO } from "../../core/application/dto/ReportRequestDTO";

export class ReportRequestMock {

  public static getReportRequest(): ReportRequestDTO {
    return {
      employeeId: '12345',
      email: 'employee@mail.com',
      month: '02',
      year: '2024',
    };
  }
}
