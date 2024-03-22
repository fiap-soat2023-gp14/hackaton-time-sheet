import { IsNotEmpty, IsString } from 'class-validator';

export class ReportRequestDTO {
  @IsString()
  @IsNotEmpty()
  employeeId: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  month: string;
  @IsNotEmpty()
  @IsNotEmpty()
  year: string;
}
