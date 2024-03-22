export class DailyRecordResponseDTO {
  day: string;
  workedHours: number;
  additionalHours: string;
  records: string[];
}

export class TimeRecordResponseDTO {
  employeeId: string;
  timeSheet: DailyRecordResponseDTO[];
}
