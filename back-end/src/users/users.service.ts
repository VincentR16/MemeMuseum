import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/updateUsers.dto';
import { SignUpDto } from 'src/auth/dto/singUp.dto';
import * as bcrypt from 'bcryptjs';
import { UserRoles } from 'src/common/types/usersRoles.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(dto: SignUpDto): Promise<User> {
    const { password, email } = dto;

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser)
      throw new BadRequestException('Email or Phone number already exists');

    //genera chiave di sale
    const salt = await bcrypt.genSalt();
    //hash sulla password
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      ...dto,
      password: hashedPassword,
      role: UserRoles.USER,
    });
    await this.usersRepository.save(user);

    return user;
  }

  async getMe(userId: string): Promise<User> {
    const result = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!result) throw new BadRequestException('user not found');
    return result;
  }

  async updateUser(userId: string, dto: UpdateProfileDto) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('Utente non trovato');
    }

    Object.assign(user, dto);
    return await this.usersRepository.save(user);
  }

  async deleteUser(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new BadRequestException('Utente non trovato');
    }
    return await this.usersRepository.delete({ id: userId });
  }
  async findByEmailOrUsername(emailOrUsername: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
  }
}
