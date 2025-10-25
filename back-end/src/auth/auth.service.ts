import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import * as dayjs from 'dayjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/types/jwtPayload.types';
import { Session } from './session.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { SignUpDto } from './dto/singUp.dto';
import { AuthenticatedRequest } from 'src/common/types/authenticatedRequest.types';

@Injectable()
export class AuthService {
  constructor(
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

  async signUp(
    dto: SignUpDto,
    req: Request,
  ): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    const user = await this.userService.createUser(dto);

    const { refreshTokenHash, accessToken, refreshToken } =
      await this.createTokens(user);

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
      user,
      accessToken,
      refreshToken,
    };
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

  getMe(userId: string): Promise<User> {
    return this.userService.getMe(userId);
  }

  async logout(req: Request) {
    const user = req.user as User;
    const deviceInfo = req.headers['user-agent'] ?? 'unknown';

    const sessions = await this.sessionRepository.find({
      where: {
        user: { id: user.id },
        deviceInfo,
      },
      relations: ['user'],
    });

    await this.sessionRepository.remove(sessions); // elimina tutti
  }

  async refreshTokens(
    req: AuthenticatedRequest,
  ): Promise<{ accessToken: string }> {
    //controllo e valido il refreshToken
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }
    //Estrae userid dal payload (utile perche non usando la guardia i campi di req non vengono implemtnati)
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(oldRefreshToken);
    } catch {
      throw new UnauthorizedException('Invalid refresh Token');
    }
    const userId = payload.userId;

    //Trova tutte la sessione per quello specifico dispositivo
    const session = await this.sessionRepository.findOne({
      where: {
        user: { id: userId },
        deviceInfo: req.headers['user-agent'] || 'unknown',
      },
      relations: ['user'],
    });
    if (!session) throw new UnauthorizedException('Invalid session');

    const isValid = await bcrypt.compare(
      oldRefreshToken,
      session.refreshTokenHash,
    );
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    if (session.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }
    //salvo il nuovo token nella sessione
    const newPayload: JwtPayload = {
      userId: session.user.id,
      role: session.user.role,
    };
    //creo il token
    const accessToken = this.jwtService.sign(newPayload);

    await this.sessionRepository.save(session);

    return {
      accessToken,
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
