import { IConnection } from '../external/IConnection';
import { ITimeRecordGateway } from '../../../core/application/repositories/ITimeRecordGateway';
import { TimeRecord } from '../../../core/domain/entities/TimeRecord';
import { OrderEntity } from './entity/OrderEntity';
import { OrderMapper } from './mappers/OrderMapper';

export default class TimeRecordGateway implements ITimeRecordGateway {
  COLLECTION_NAME = 'TimeRecords';
  private dbConnection: IConnection;
  constructor(database: IConnection) {
    this.dbConnection = database;
  }

  //TODO FIX IT
  getAllByEmployeeId(employeeId: string, params?: any): Promise<TimeRecord[]> {
        throw new Error('Method not implemented.');
    }

  public async create(order: TimeRecord): Promise<TimeRecord> {
    const orderEntity = OrderMapper.toEntity(order);

    try {
      await this.dbConnection
        .getCollection(this.COLLECTION_NAME)
        .insertOne(orderEntity);
      console.log('Order created successfully.');
      return Promise.resolve(OrderMapper.toDomain(orderEntity));
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  public async getAll(queryParam?): Promise<Array<TimeRecord>> {
    if (queryParam && queryParam.status) {
      queryParam.status = await OrderMapper.toStatusEntity(queryParam.status);
    }
    const query = queryParam
      ? {
          ...queryParam,
        }
      : {};
    const orders: Array<OrderEntity> = await this.dbConnection
      .getCollection(this.COLLECTION_NAME)
      .find(query)
      .sort({ createdAt: +1 })
      .toArray();

    return Promise.resolve(OrderMapper.toDomainList(orders));
  }

  public async getSorted(): Promise<Array<TimeRecord>> {
    const orders: Array<OrderEntity> = await this.dbConnection
      .getCollection(this.COLLECTION_NAME)
      .find({ $or: [{ status: 1 }, { status: 4 }, { status: 5 }] })
      .sort({ status: -1 }, { createdAt: +1 })
      .toArray();

    return Promise.resolve(OrderMapper.toDomainList(orders));
  }


}
