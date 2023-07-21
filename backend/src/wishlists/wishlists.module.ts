import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishList } from './entities/wishlist.entity';
import { WishlistsController } from './wishlists.controller';
import { WishlistService } from './wishlists.service';

@Module({
  imports: [TypeOrmModule.forFeature([WishList])],
  controllers: [WishlistsController],
  providers: [WishlistService],
  exports: [WishlistService],
})
export class WishlistModule {}
