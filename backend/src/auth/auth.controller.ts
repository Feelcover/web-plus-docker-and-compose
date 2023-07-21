import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { CustomRequest } from 'src/utils/CustomRequest';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signin(@Req() req: CustomRequest) {
    return this.authService.auth(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const { about, ...rest } = createUserDto;
    const userDto = (about !== '' ? createUserDto : rest) as CreateUserDto;

    const user = await this.userService.create(userDto);
    this.authService.auth(user);

    return user;
  }
}
