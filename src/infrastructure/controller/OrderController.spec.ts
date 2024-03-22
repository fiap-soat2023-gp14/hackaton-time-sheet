import { OrderController } from './OrderController';
import { IConnection } from '../adapters/external/IConnection';
import { OrderStatus } from '../../core/domain/enums/OrderStatus';
import TimeSheetUseCase from 'src/core/application/usecase/TimeSheetUseCase';
import { TimeRecord } from '../../core/domain/entities/TimeRecord';
import { TimeRecordResponseDTO } from '../../core/application/dto/TimeRecordResponseDTO';
import { OrderMock } from '../mocks/OrderMock';
import {MessageProducer} from "../adapters/external/MessageProducer";

jest.mock('.../../../infrastructure/adapters/gateway/PaymentGateway');
jest.mock('../adapters/external/MessageProducer');
describe('OrderController', () => {
  let orderController: OrderController;
  let orderConnectionMock: IConnection;
  let messageProducer: MessageProducer;

  beforeEach(() => {
    orderConnectionMock = {} as IConnection;
    orderController = new OrderController();
  });

  describe('createOrder', () => {
    it('should create an order and return the order response', async () => {
      // Mock dependencies and input parameters
      const body = OrderMock.getOrderBody();
      const oauthToken = 'mockToken';

      const orderMockResolver = await OrderMock.getOrder();

      const expectedOrderResponse = OrderMock.getOrderDTO();
      jest
        .spyOn(TimeSheetUseCase, 'createRecord')
        .mockResolvedValueOnce(orderMockResolver);

      // Call the method under test
      const result = await orderController.createOrder(
        body,
        oauthToken,
        orderConnectionMock,
          messageProducer,
      );

      // Assert the result
      await expect(result).toEqual(expectedOrderResponse);
    });
  });

  describe('updateOrder', () => {
    it('should update an order and return the order response', async () => {
      // Mock dependencies and input parameters
      const body = {
        status: OrderStatus.FINISHED,
      };
      const orderMockResolver = OrderMock.getOrder();
      const expectedOrderResponse = OrderMock.getOrderDTO();
      jest
        .spyOn(TimeSheetUseCase, 'updateOrder')
        .mockResolvedValueOnce(orderMockResolver);

      // Call the method under test
      const result = await orderController.updateOrder(
        'ord-1',
        OrderStatus.RECEIVED,
        orderConnectionMock,
      );

      // Assert the result
      await expect(result).toEqual(expectedOrderResponse);
    });
  });
  describe('getAllOrders', () => {
    it('should get all orders and return the order response list', async () => {
      // Mock dependencies and input parameters
      const params = {
        /* mock params */
      };

      // Mock the expected return value
      const mockedOrderResponseList: TimeRecord[] = await OrderMock.getOrderList();

      const expectedOrderResponseList: TimeRecordResponseDTO[] =
        await OrderMock.getExpectedOrderList();
      jest
        .spyOn(TimeSheetUseCase, 'getAllRecordsByEmployeeId')
        .mockResolvedValueOnce(mockedOrderResponseList);

      // Call the method under test
      const result = await orderController.getAllOrders(
        params,
        orderConnectionMock,
      );

      // Assert the result
      expect(result).toEqual(expectedOrderResponseList);
    });
  });

  describe('getSortedOrders', () => {
    it('should get all orders sorted and return the order response list', async () => {
      // Mock dependencies and input parameters
      const params = {
        status: OrderStatus.RECEIVED,
      };

      // Mock the expected return value
      const mockedOrderResponseList: TimeRecord[] = await OrderMock.getOrderList();
      const expectedOrderResponseList: TimeRecordResponseDTO[] =
        await OrderMock.getExpectedOrderList();
      jest
        .spyOn(TimeSheetUseCase, 'getSortedOrders')
        .mockResolvedValueOnce(mockedOrderResponseList);

      // Call the method under test
      const result = await orderController.getSortedOrders(
        params,
        orderConnectionMock,
      );

      // Assert the result
      expect(result).toEqual(expectedOrderResponseList);
    });
  });

  describe('getOrderById', () => {
    it('should get order by id and return the order response', async () => {
      const mockedOrderResponseList: TimeRecord = await OrderMock.getOrder();
      const expectedOrderResponseList: TimeRecordResponseDTO =
        OrderMock.getOrderDTO();
      jest
        .spyOn(TimeSheetUseCase, 'getOrderById')
        .mockResolvedValueOnce(mockedOrderResponseList);

      // Call the method under test
      const result = await orderController.getOrderById(
        'ord-1',
        orderConnectionMock,
      );

      // Assert the result
      expect(result).toEqual(expectedOrderResponseList);
    });
  });
  // Add tests for other methods (getSortedOrders, getOrderById, updateOrder) in a similar manner
});
