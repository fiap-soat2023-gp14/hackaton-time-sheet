import {Allow, IsNotEmpty, IsString} from 'class-validator';

export class TimeRecordCreationDTO {
  @IsString()
  @IsNotEmpty()
  employeeId: string;
  @IsNotEmpty()
  record: Date;
  @IsString()
  @IsNotEmpty()
  type: string;
}
