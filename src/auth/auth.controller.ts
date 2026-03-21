import { Controller, Post, Body, Patch, Param} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.loginUser(createUserDto);
  }


  
  @Patch('/:email')
updateUser(
  @Param('email') userEmail: string, 
  @Body() updateUserDto: UpdateUserDto
) {
  return this.authService.updateUser(userEmail, updateUserDto);
}
}