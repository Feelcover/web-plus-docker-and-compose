import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { DatabaseFactory } from './config/database-config.factory';
import { HashModule } from './hash/hash.module';
import { OffersModule } from './offers/offers.module';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistModule } from './wishlists/wishlists.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseFactory }),
    OffersModule,
    UsersModule,
    WishlistModule,
    WishesModule,
    HashModule,
    AuthModule,
  ],
  providers: [DatabaseFactory],
})
export class AppModule {}
