import {
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateWishlistDto {
  @Length(1, 250, {
    message: 'Название должно быть от 2 до 250 символов',
  })
  @IsString()
  name: string;

  @MaxLength(1500, {
    message: 'Максимальная длина не должна превышать 1500 символов',
  })
  @IsString()
  @IsOptional()
  description: string;

  @IsUrl()
  @IsString()
  image: string;

  @IsArray()
  itemsId: number[];
}
