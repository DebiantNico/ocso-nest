import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from './decorators/roles.decorators';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  registerUser(createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        userEmail: loginUserDto.userEmail
      }
    });

    if (!user) throw new UnauthorizedException();
    const match = bcrypt.compareSync(loginUserDto.userPassword, user.userPassword);
    if (!match) throw new UnauthorizedException();

    const payload = {
      userEmail: user.userEmail,
      userPassword: user.userPassword
    };

    const token = this.jwtService.sign(payload);
    return token;
  }

  async updateUser(userEmail: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
    userEmail: userEmail,
    ...updateUserDto
  });
  
  if (!user) throw new UnauthorizedException("Usuario no encontrado");
  
  return await this.userRepository.save(user);
}
}