import TimeRecordAdapter from 'src/core/application/adapter/TimeRecordAdapter';
import { TimeRecordCreationDTO } from 'src/core/application/dto/TimeRecordCreationDTO';
import { TimeRecordResponseDTO } from 'src/core/application/dto/TimeRecordResponseDTO';
import { IConnection } from 'src/infrastructure/adapters/external/IConnection';
import TimeSheetUseCase from 'src/core/application/usecase/TimeSheetUseCase';
import TimeRecordGateway from '../adapters/gateway/TimeRecordGateway';
import { OrderStatus } from '../../core/domain/enums/OrderStatus';
import { PaymentController } from './PaymentController';
import UserGateway from '../adapters/gateway/UserGateway';
import ProductGateway from '../adapters/gateway/ProductGateway';
import { ITimeRecordGateway } from '../../core/application/repositories/ITimeRecordGateway';
import { IUserGateway } from '../../core/application/repositories/IUserGateway';
import { IProductGateway } from '../../core/application/repositories/IProductGateway';
import PaymentGateway from '../adapters/gateway/PaymentGateway';
import { PaymentMapper } from '../adapters/gateway/mappers/PaymentMapper';
import { MessageProducer } from '../adapters/external/MessageProducer';

export class OrderController {
  public async createOrder(
    body: TimeRecordCreationDTO,
    oauthToken: string,
    dbConnection: IConnection,
    messageProducer: MessageProducer,
  ): Promise<TimeRecordResponseDTO> {
    const orderGateway: ITimeRecordGateway = new TimeRecordGateway(dbConnection);
    const userGateway: IUserGateway = new UserGateway();
    const productGateway: IProductGateway = new ProductGateway();
    const paymentGateway: PaymentGateway = new PaymentGateway();
    const orderBody = await TimeRecordAdapter.toDomain(body);
    const order = await TimeSheetUseCase.createRecord(
      orderBody,
      oauthToken,
      orderGateway,
      userGateway,
      productGateway,
    );
    try {
      await PaymentController.receivePaymentFeedback(
        PaymentMapper.toPaymnent(order),
        paymentGateway,
        messageProducer,
      );
    } catch (e) {
      console.error(e);
      await TimeSheetUseCase.updateOrder(
        order.id,
        OrderStatus.CANCELLED,
        orderGateway,
      );
      order.status = OrderStatus.CANCELLED;
    }
    return TimeRecordAdapter.toDTO(order);
  }

  public async getAllOrders(
    params: any,
    dbConnection: IConnection,
  ): Promise<Array<TimeRecordResponseDTO>> {
    const gateway = new TimeRecordGateway(dbConnection);
    const orders = await TimeSheetUseCase.getAllRecordsByEmployeeId(params, gateway);

    return TimeRecordAdapter.toDTOList(orders);
  }

  public async getSortedOrders(
    params: any,
    dbConnection: IConnection,
  ): Promise<Array<TimeRecordResponseDTO>> {
    const gateway = new TimeRecordGateway(dbConnection);
    const orders = await TimeSheetUseCase.getSortedOrders(params, gateway);

    return TimeRecordAdapter.toDTOList(orders);
  }

  public async getOrderById(
    id: string,
    dbConnection: IConnection,
  ): Promise<TimeRecordResponseDTO> {
    const gateway = new TimeRecordGateway(dbConnection);
    const order = await TimeSheetUseCase.getOrderById(id, gateway);

    return TimeRecordAdapter.toDTO(order);
  }

  public async updateOrder(
    id: string,
    status: OrderStatus,
    dbConnection: IConnection,
  ): Promise<TimeRecordResponseDTO> {
    const gateway = new TimeRecordGateway(dbConnection);
    const order = await TimeSheetUseCase.updateOrder(id, status, gateway);

    return TimeRecordAdapter.toDTO(order);
  }

  public async removeUserData(
    id: string,
    oauthToken: string,
    dbConnection: IConnection,
  ): Promise<void> {
    try {
      const orderGateway: ITimeRecordGateway = new TimeRecordGateway(dbConnection);
      await orderGateway.removeUserData(id);
      const userGateway: IUserGateway = new UserGateway();
      await userGateway.removeUserById(id, oauthToken);
    } catch (e) {
      console.error(e);
    }
  }
}
