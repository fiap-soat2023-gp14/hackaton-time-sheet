import { IsNotEmpty, IsString } from 'class-validator';

export class TimeRecordCreationDTO {
  @IsString()
  employeeId: string;
  @IsNotEmpty()
  record: Date;
}
