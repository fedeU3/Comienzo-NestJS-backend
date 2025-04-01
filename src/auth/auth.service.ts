import { ConflictException, Injectable, NotFoundException, Request, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}
  getAuth(user) {
    const { password, _id, ...result } = user;
    return result;
  }
  async signUp(signUpDTO: SignUpDTO): Promise<{token: string}> {
    const { password } = signUpDTO;

    const existingUser = await this.usersService.getByUserName(signUpDTO.userID);

    if (existingUser) {
      throw new ConflictException('User with this user name already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.createUser({
      ...signUpDTO,
      password: hashedPassword,
    })

    const token = this.jwtService.sign({ id: newUser.id });

    return { token };
  }

  async login(loginDTO: LoginDTO): Promise<{token: string}> {
    const { userID, password } = loginDTO;

    const existingUser = await this.usersService.getByUserName(userID);

    if (!existingUser) {
      throw new NotFoundException('User with this user name does not exist');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({ id: existingUser.id });

    return { token };
  }
}