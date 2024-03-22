import { ProductCategory } from '../../core/domain/enums/ProductCategory';
import { OrderStatus } from '../../core/domain/enums/OrderStatus';
import { TimeRecord } from '../../core/domain/entities/TimeRecord';
import { EmployeeId } from '../../core/domain/valueObjects/EmployeeId';
import { Money } from '../../core/domain/valueObjects/Money';
import { OrderEntity } from '../adapters/gateway/entity/OrderEntity';
import { OrderEntityStatus } from '../adapters/gateway/enums/OrderEntityStatus';
import { TimeRecordResponseDTO } from '../../core/application/dto/TimeRecordResponseDTO';

export class OrderMock {
  public static async getOrder(): Promise<TimeRecord> {
    const orderMock: TimeRecord = {
      id: '1',
      customer: {
        id: '42',
        email: 'test@test.com',
        name: 'test untario',
        cpf: await EmployeeId.create('12345678910'),
        phone: '123456789',
        createdAt: new Date('2024-01-26T17:41:00Z'),
        updatedAt: new Date('2024-01-26T17:41:00Z'),
      },
      createdAt: new Date('2024-01-26T17:41:00Z'),
      deliveredAt: new Date('2024-01-26T17:41:00Z'),
      extraItems: undefined,
      items: [
        {
          product: {
            id: '3',
            name: 'test product',
            description: 'only unit test',
            imageUrl: 'http://imagetest.com.png',
            price: await Money.create(100),
            category: ProductCategory.SANDWICH,
            createdAt: new Date('2024-01-26T17:41:00Z'),
          },
          observation: undefined,
          quantity: 1,
        },
      ],
      status: OrderStatus.RECEIVED,
      total: await Money.create(100),
    };
    return orderMock;
  }

  public static async getOrderList(): Promise<TimeRecord[]> {
    const orderMock: TimeRecord[] = [
      {
        id: '1',
        customer: {
          id: '42',
          email: 'test@test.com',
          name: 'test untario',
          cpf: await EmployeeId.create('12345678910'),
          phone: '123456789',
          createdAt: new Date('2024-01-26T17:41:00Z'),
        },
        createdAt: new Date('2024-01-26T17:41:00Z'),
        deliveredAt: new Date('2024-01-26T17:41:00Z'),
        extraItems: undefined,
        items: [
          {
            product: {
              id: '3',
              name: 'test product',
              description: 'only unit test',
              imageUrl: 'http://imagetest.com.png',
              price: await Money.create(100),
              category: ProductCategory.SANDWICH,
              createdAt: new Date('2024-01-26T17:41:00Z'),
            },
            observation: undefined,
            quantity: 1,
          },
        ],
        status: OrderStatus.RECEIVED,
        total: await Money.create(100),
      },
    ];
    return orderMock;
  }

  public static async getExpectedOrderList(): Promise<TimeRecordResponseDTO[]> {
    const orderMock: TimeRecordResponseDTO[] = [
      {
        id: '1',
        customer: {
          id: '42',
          email: 'test@test.com',
          name: 'test untario',
          cpf: '12345678910',
          phone: '123456789',
        },
        createdAt: new Date('2024-01-26T17:41:00Z'),
        deliveredAt: new Date('2024-01-26T17:41:00Z'),
        extraItems: undefined,
        items: [
          {
            product: {
              id: '3',
              name: 'test product',
              description: 'only unit test',
              imageUrl: 'http://imagetest.com.png',
              price: 100,
              category: ProductCategory.SANDWICH,
              createdAt: new Date('2024-01-26T17:41:00Z'),
            },
            observation: undefined,
            quantity: 1,
          },
        ],
        status: OrderStatus.RECEIVED,
        total: 100,
      },
    ];
    return orderMock;
  }

  public static getOrderEntity(): OrderEntity {
    return {
      _id: '1',
      customer: {
        _id: '42',
        email: 'test@test.com',
        name: 'test untario',
        cpf: '12345678910',
        phone: '123456789',
        createdAt: new Date('2024-01-26T17:41:00Z'),
        updatedAt: new Date('2024-01-26T17:41:00Z'),
      },
      createdAt: new Date('2024-01-26T17:41:00Z'),
      deliveredAt: new Date('2024-01-26T17:41:00Z'),
      extraItems: undefined,
      items: [
        {
          product: {
            _id: '3',
            name: 'test product',
            description: 'only unit test',
            imageUrl: 'http://imagetest.com.png',
            price: 100,
            category: ProductCategory.SANDWICH,
            createdAt: new Date('2024-01-26T17:41:00Z'),
          },
          observation: undefined,
          quantity: 1,
        },
      ],
      status: OrderEntityStatus.RECEIVED,
      total: 100,
    };
  }

  public static getOrderDTO(): TimeRecordResponseDTO {
    const expectedOrderResponse = {
      id: '1',
      customer: {
        id: '42',
        email: 'test@test.com',
        name: 'test untario',
        cpf: '12345678910',
        phone: '123456789',
      },
      createdAt: new Date('2024-01-26T17:41:00Z'),
      deliveredAt: new Date('2024-01-26T17:41:00Z'),
      extraItems: undefined,
      items: [
        {
          product: {
            id: '3',
            name: 'test product',
            description: 'only unit test',
            imageUrl: 'http://imagetest.com.png',
            price: 100,
            category: ProductCategory.SANDWICH,
            createdAt: new Date('2024-01-26T17:41:00Z'),
          },
          observation: undefined,
          quantity: 1,
        },
      ],
      status: OrderStatus.RECEIVED,
      total: 100,
    };
    return expectedOrderResponse;
  }

  public static getOrderBody() {
    return {
      customerId: '123abc',
      items: [
        {
          productId: 'prod456',
          quantity: 2,
          observation: 'This is a test observation',
        },
        {
          productId: 'prod789',
          quantity: 1,
          observation: 'Another test observation',
        },
      ],
      extraItems: 'Extra item details',
    };
  }
}
