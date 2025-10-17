import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import dayjs from 'dayjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/types/jwtPayload';
import { Session } from './session.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async validateUser(emailOrUsername: string, password: string): Promise<User> {
    const user = await this.userService.findByEmailOrUsername(emailOrUsername);

    if (!user) throw new UnauthorizedException('User not found');

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(
    req: Request,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = req.user as User;
    if (!user) throw new InternalServerErrorException();

    const { refreshTokenHash, accessToken, refreshToken } =
      await this.createTokens(user);

    //elimino vecchia sessione per quel dispositivo
    await this.sessionRepository.delete({
      user: { id: user.id },
      deviceInfo: req.headers['user-agent'] || 'unknown',
    });

    // Salva sessione nel DB
    const session = this.sessionRepository.create({
      refreshTokenHash: refreshTokenHash,
      deviceInfo: req.headers['user-agent'] || 'unknown',
      ipAddress: req.ip,
      expiresAt: dayjs().add(7, 'days').toDate(),
      user: user,
    });

    await this.sessionRepository.save(session);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async createTokens(user: User): Promise<{
    accessToken: string;
    refreshTokenHash: string;
    refreshToken: string;
  }> {
    const payload: JwtPayload = {
      userId: user.id,
      role: user.role,
    };
    //Genera accessToken
    const accessToken = this.jwtService.sign(payload);
    //Genera refreshToken
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    //genera chiave di sale
    const salt = await bcrypt.genSalt();
    const refreshTokenHash = await bcrypt.hash(refreshToken, salt);

    return { accessToken, refreshTokenHash, refreshToken };
  }
}
