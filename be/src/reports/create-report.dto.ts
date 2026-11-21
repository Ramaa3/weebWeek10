import { IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';
const categories = ['Kualitas Udara', 'Kualitas Air', 'Kualitas Tanah', 'Lainnya'];
const statuses = ['Ditinjau', 'Menunggu Tinjauan'];
export class CreateReportDto {
  @IsString() @IsNotEmpty() id: string;
  @IsIn(categories) category: string;
  @Matches(/^\d{4}-\d{2}-\d{2}$/) date: string;
  @IsIn(statuses) status: string;
  @IsString() @IsNotEmpty() description: string;
}
