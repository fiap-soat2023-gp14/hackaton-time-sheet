import { EmployeeId } from "./EmployeeId";
import { ValidationException } from 'src/infrastructure/exceptions/ValidationException';

describe('EmployeeId', () => {
  describe('create', () => {
    it('should create a EmployeeId successfully', async () => {
      const rawValue = '12345';

      const employeeId = await EmployeeId.create(rawValue);

      expect(employeeId).toBeInstanceOf(EmployeeId);
      expect(employeeId.value).toBe('12345');
    });
  });

  describe('validate', () => {
    it('should throw an error for a invalid employee ID', async () => {
      const inValidEmployeeIdValue = '01';
      const invalidEmployeeId = await EmployeeId.create(inValidEmployeeIdValue);

      await expect(invalidEmployeeId.validate()).rejects.toThrow(ValidationException);
    });

    it('should throw ValidationException for a CPF with incorrect length', async () => {
      const inValidEmployeeIdValue = 'invalidEmployeeId';
      const invalidEmployeeId = await EmployeeId.create(inValidEmployeeIdValue);

      await expect(invalidEmployeeId.validate()).rejects.toThrow(ValidationException);
    });

  });
});
