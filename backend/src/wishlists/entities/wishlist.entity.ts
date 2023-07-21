import { IsOptional, IsUrl, Length, MaxLength } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { MainEntity } from 'src/utils/MainEntity';
import { PartialWishDto } from 'src/wishes/dto/partial-wish.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class WishList extends MainEntity {
  @Column()
  @Length(1, 250)
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  @MaxLength(1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToMany(() => Wish)
  @JoinTable()
  items: PartialWishDto[];

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
}
