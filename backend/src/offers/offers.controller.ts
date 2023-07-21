import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CustomRequest } from 'src/utils/CustomRequest';
import { OffersService } from './offers.service';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  getAll() {
    return this.offersService.getAll();
  }

  @Get(':id')
  GetOne(@Param('id') id: string) {
    return this.offersService.getOne(+id);
  }

  @Post()
  create(@Body() CreateOfferDto, @Req() req: CustomRequest) {
    return this.offersService.create(CreateOfferDto, req.user.id);
  }
}
