import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  registerUser(createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async loginUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        userEmail: createUserDto.userEmail
      }
    });

    if (!user) throw new UnauthorizedException("No estas autorizado");
    const match = bcrypt.compareSync(createUserDto.userPassword, user.userPassword);
    if (!match) throw new UnauthorizedException("No estas autorizado");
    const token = jwt.sign(JSON.stringify(user), "SECRET KEY");

    return token;
  }
}