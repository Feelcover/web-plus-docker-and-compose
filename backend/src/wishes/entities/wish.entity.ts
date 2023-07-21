import { IsInt, IsString, IsUrl, Length } from 'class-validator';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { MainEntity } from 'src/utils/MainEntity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Wish extends MainEntity {
  @Column()
  @Length(1, 250)
  @IsString()
  name: string;

  @Column()
  @IsUrl()
  @IsString()
  link: string;

  @Column()
  @IsUrl()
  @IsString()
  image: string;

  @Column({ scale: 2 })
  @IsInt()
  price: number;

  @Column({ scale: 2, default: 0 })
  @IsInt()
  raised: number;

  @ManyToOne(() => User, (asd) => asd.wishes)
  owner: User;

  @Column()
  @Length(1, 1024)
  @IsString()
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column({ default: 0 })
  copied: number;
}
