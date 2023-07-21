import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CustomRequest } from 'src/utils/CustomRequest';
import { UpdateWishDto } from './dto/update-wish.dto';
import { WishesService } from './wishes.service';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Get('last')
  getLastWishes() {
    return this.wishesService.getLast();
  }

  @Get('top')
  getTopWishes() {
    return this.wishesService.getTop();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.wishesService.getById(+id);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() CreateWishDto, @Req() req: CustomRequest) {
    return this.wishesService.create(CreateWishDto, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: CustomRequest,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    return this.wishesService.updateOne(+id, req.user.id, updateWishDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: CustomRequest) {
    return this.wishesService.removeOne(+id, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  copy(@Param('id') wishId: string, @Req() req: CustomRequest) {
    return this.wishesService.copiedWish(+wishId, req.user.id);
  }
}
