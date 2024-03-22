import { TimeRecord, OrderItem } from '../../domain/entities/TimeRecord';
import { OrderStatus } from '../../domain/enums/OrderStatus';
import { TimeRecordCreationDTO } from '../dto/TimeRecordCreationDTO';
import {
  DailyRecordResponseDTO,
  OrderResponseDTO,
} from '../dto/OrderResponseDTO';
import ProductAdapter from './ProductAdapter';
import { UserAdapter } from './UserAdapter';
import User from '../../domain/entities/User';

export default class OrderAdapter {
  static async toDomain(orderCreationDTO: TimeRecordCreationDTO): Promise<TimeRecord> {
    const orderItemList = orderCreationDTO.items.map((item) => {
      return OrderItem.create(item.productId, item.observation, item.quantity);
    });
    const customer = orderCreationDTO.customerId
      ? new User(orderCreationDTO.customerId)
      : null;
    return {
      id: null,
      customer: customer,
      deliveredAt: undefined,
      createdAt: new Date(),
      status: OrderStatus.RECEIVED,
      extraItems: orderCreationDTO.extraItems,
      total: undefined,
      items: orderItemList,
    };
  }

  static toDTO(order: TimeRecord): OrderResponseDTO {
    return {
      id: order.id,
      customer: order.customer
        ? UserAdapter.toResponse(order.customer)
        : undefined,
      createdAt: order.createdAt,
      deliveredAt: order.deliveredAt,
      extraItems: order.extraItems,
      items: this.itemsToDTO(order.items),
      status: order.status,
      total: order.total.value,
    };
  }

  private static itemToDTO(item: OrderItem): DailyRecordResponseDTO {
    return {
      product: ProductAdapter.toDTO(item.product),
      observation: item.observation,
      quantity: item.quantity,
    };
  }

  static itemsToDTO(items: OrderItem[]): DailyRecordResponseDTO[] {
    return items.map((item) => this.itemToDTO(item));
  }

  static toDTOList(orders: TimeRecord[]): OrderResponseDTO[] {
    return orders.map((order) => this.toDTO(order));
  }
}
