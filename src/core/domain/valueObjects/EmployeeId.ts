import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ValidationException } from 'src/infrastructure/exceptions/ValidationException';
import { ValueObject } from './ValueObject';

class ValueProps {
  @IsString()
  @IsNotEmpty()
  @Length(5, 5)
  value: string;
}

export class EmployeeId extends ValueObject<ValueProps> {
  public readonly value: string;

  private constructor(props: ValueProps) {
    super(props);
    this.value = props.value;
  }

  public static async create(value: string): Promise<EmployeeId> {
    const cpfValue = value.replace(/[^\d]+/g, '');
    const valueProps = { value: cpfValue };
    return new EmployeeId(valueProps);
  }
  public async validate(): Promise<void> {
    if (
      this.value.length !== 5 ||
      !Array.from(this.value).filter((e) => e !== this.value[0]).length
    ) {
      throw new ValidationException('Invalid employee ID');
    }
  }
}
