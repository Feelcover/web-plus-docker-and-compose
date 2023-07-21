import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishList } from 'src/wishlists/entities/wishlist.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { MainEntity } from '../../utils/MainEntity';

@Entity()
export class User extends MainEntity {
  @Column({ unique: true })
  @IsNotEmpty()
  @Length(2, 30)
  @IsString()
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @Length(2, 200)
  @IsOptional()
  @IsString()
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsOptional()
  @IsUrl()
  @IsString()
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  @IsString()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @OneToMany(() => WishList, (wishlist) => wishlist.owner)
  wishlists: WishList[];
}
