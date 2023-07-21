import { User } from 'src/users/entities/user.entity';
import { MainEntity } from 'src/utils/MainEntity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Offer extends MainEntity {
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @Column({ scale: 2 })
  amount: number;

  @Column({ default: false })
  hidden: boolean;
}
