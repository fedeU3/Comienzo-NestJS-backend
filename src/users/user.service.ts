import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/CreateUserDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) { }
  getAll() {
    return this.userRepository.find();
  }

  getById(id: number) {
    return this.userRepository.findOne({
      where: { id }
    });
  }
  getByUserName(userID: string) {
    return this.userRepository.findOne({
      where: { userID }
    });
  }
  async createUser(usuario: CreateUserDTO) {
    return this.userRepository.save(usuario);
  }
}