import { ReportRequestDTO } from '../dto/ReportRequestDTO';
import ReportRequestAdapter from './ReportRequestAdapter';
import { ReportRequestMock } from '../../../infrastructure/mocks/ReportRequestMock';
import {ReportRequest} from "../../domain/entities/ReportRequest";
import {EmployeeId} from "../../domain/valueObjects/EmployeeId";

describe('ReportRequestAdapter', () => {
  describe('toDomain', () => {
    it('should convert ReportRequestDTO to ReportRequest domain object', async () => {
      // Arrange
      const reportRequestDTO: ReportRequestDTO =
        ReportRequestMock.getReportRequest();
      // Act
      const result: ReportRequest = await ReportRequestAdapter.toDomain(
        reportRequestDTO,
      );

      // Assert
      expect(result).toEqual({
        employeeId: await EmployeeId.create('12345'),
        email: 'employee@mail.com',
        month: '02',
        year: '2024',
      });
    });
  });
});
