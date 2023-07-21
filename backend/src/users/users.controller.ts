import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CustomRequest } from 'src/utils/CustomRequest';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getUser(@Req() req: CustomRequest) {
    return req.user;
  }

  @Get('me/wishes')
  getMyWishes(@Req() req: CustomRequest) {
    return this.usersService.getMyWishes(req.user.id);
  }

  @Get(':username')
  getByUsername(@Param('username') username: string) {
    return this.usersService.getByUsername(username);
  }

  @Get(':username/wishes')
  getUserWishes(@Param('username') username: string) {
    return this.usersService.getUserWishes(username);
  }

  @Patch('me')
  updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req: CustomRequest) {
    return this.usersService.updateOne(req.user.id, updateUserDto);
  }

  @Post('find')
  findByUserNameOrEmail(@Body() searchUserDto: SearchUserDto) {
    const { query } = searchUserDto;
    return this.usersService.findByQuery(query);
  }
}
