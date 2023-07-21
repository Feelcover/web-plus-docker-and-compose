import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishList } from './entities/wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(WishList)
    private wishlistRepository: Repository<WishList>,
  ) {}

  findAll(query: FindManyOptions<WishList>) {
    return this.wishlistRepository.find(query);
  }

  findOne(query: FindOneOptions<WishList>) {
    return this.wishlistRepository.findOne(query);
  }

  getWishLists() {
    return this.findAll({ relations: ['items', 'owner'] });
  }

  getById(id: number) {
    return this.findOne({
      where: { id },
      relations: ['items', 'owner'],
    });
  }

  create(createWishListDto: CreateWishlistDto, ownerId: number) {
    const { itemsId, ...rest } = createWishListDto;
    const items = itemsId.map((id) => ({ id }));
    const wishList = this.wishlistRepository.create({
      ...rest,
      items,
      owner: { id: ownerId },
    });

    return this.wishlistRepository.save(wishList);
  }

  async update(
    id: number,
    updateWishListDto: UpdateWishlistDto,
    userId: number,
  ) {
    const wishList = await this.findOne({
      where: { id },
      relations: { owner: true },
    });
    if (wishList.owner.id !== userId) {
      throw new ForbiddenException(
        'Нельзя редактировать чужой список подарков',
      );
    }
    const { itemsId, ...rest } = updateWishListDto;
    const items = itemsId.map((id) => ({ id }));
    const updatedWishList = { ...rest, items };
    await this.wishlistRepository.update(id, updatedWishList);

    return this.findOne({ where: { id } });
  }

  async delete(id: number, userId: number) {
    const wishList = await this.findOne({
      where: { id },
      relations: { owner: true },
    });
    if (wishList.owner.id !== userId) {
      throw new ForbiddenException(
        'Вы можете удалять только свои списки подарков',
      );
    }
    await this.wishlistRepository.delete(id);

    return wishList;
  }
}
