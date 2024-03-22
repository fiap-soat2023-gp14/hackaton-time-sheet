import TimeSheetUseCase from './TimeSheetUseCase';
import TimeRecordGateway from '../../../infrastructure/adapters/gateway/TimeRecordGateway';
import { MongoConnection } from '../../../infrastructure/adapters/external/MongoConnection';
import { OrderMock } from '../../../infrastructure/mocks/OrderMock';
import { HttpNotFoundException } from '../../../infrastructure/exceptions/HttpNotFoundException';

jest.mock('../../../infrastructure/adapters/gateway/TimeRecordGateway');
jest.mock('./UserUseCase');
jest.mock('./ProductUseCase');
jest.mock('./ReportUseCase');
jest.mock('../../../infrastructure/adapters/external/MongoConnection');
jest.mock('.../../../infrastructure/adapters/gateway/PaymentGateway');

describe('TimeSheetUseCase', () => {
  const mongoConnection = new MongoConnection();
  const token = 'oauthToken';
  const timeRecordGateway = new TimeRecordGateway(mongoConnection);

  describe('createTimeRecord', () => {
    it('should create a record', async () => {
      const order = await OrderMock.getOrder();
      (timeRecordGateway.create as jest.Mock).mockResolvedValueOnce(order);

      const createdOrder = await TimeSheetUseCase.createRecord(
        order,
        token,
        timeRecordGateway,
      );

      expect(timeRecordGateway.create).toBeCalledTimes(1);
      expect(timeRecordGateway.create).toBeCalledWith(order);
    });

    // ... tests for other scenarios, including errors
  });

  describe('getAllOrders', () => {
    it('should return all orders from the gateway', async () => {
      // Arrange
      const employeeId = '12345';
      const params = {}; // Set your desired params here\
      const orders = await OrderMock.getOrderList();
      (timeRecordGateway.getAll as jest.Mock).mockResolvedValueOnce(orders);

      // Act
      const result = await TimeSheetUseCase.getAllRecordsByEmployeeId(employeeId, params, timeRecordGateway);

      // Assert
      expect(timeRecordGateway.getAll).toHaveBeenCalledTimes(1);
      expect(timeRecordGateway.getAll).toHaveBeenCalledWith(params);
      expect(result).toEqual(orders);
    });

    // ... Add more test cases for different scenarios
  });
});
