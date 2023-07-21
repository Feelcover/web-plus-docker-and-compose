import { IsNumber, IsString, IsUrl, Length, Min } from 'class-validator';

export class CreateWishDto {
  @Length(1, 250, {
    message: 'Название должно быть от 1 до 250 символов',
  })
  @IsString()
  name: string;

  @IsString()
  @IsUrl({}, { message: 'Введите корректную ссылку' })
  link: string;

  @IsString()
  @IsUrl({}, { message: 'Введите корректную ссылку' })
  image: string;

  @IsNumber()
  @Min(1)
  price: number;

  @Length(1, 1024, { message: 'Описание должно быть от 1 до 1024 символов' })
  @IsString()
  description: string;
}
