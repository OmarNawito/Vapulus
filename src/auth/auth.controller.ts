import { LoginDto, RegisterDto } from './dto/auth.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('/login')
  async login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }


  @Post('/register')
  async register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }
}
