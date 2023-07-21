import {
  IsDateString,
  IsInt,
  IsNumber,
  IsString,
  IsUrl,
  Length,
  Min,
} from 'class-validator';

export class PartialWishDto {
  @IsInt()
  id: number;

  @Length(1, 250, { message: 'Название должно быть от 1 до 250 символов' })
  @IsString()
  name: string;

  @IsUrl()
  @IsString()
  link: string;

  @IsUrl()
  @IsString()
  image: string;

  @Min(1)
  @IsNumber()
  price: number;

  @Min(1)
  @IsNumber()
  raised: number;

  @IsNumber()
  copied: number;

  @Length(1, 1024, { message: 'Описание должно быть от 1 до 250 символов' })
  description: string;

  @IsDateString()
  @IsString()
  createdAt: string;

  @IsDateString()
  @IsString()
  updatedAt: string;
}
