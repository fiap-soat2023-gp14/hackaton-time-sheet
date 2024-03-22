export class DailyRecordResponseDTO {
  day: string;
  workedHours: number;
  additionalHours: string;
  records: string[];
}

export class OrderResponseDTO {
  employeeId: string;
  records: DailyRecordResponseDTO[];
}
