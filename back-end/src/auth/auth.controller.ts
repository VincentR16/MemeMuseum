import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../common/guard/local-auth.guard';
import { Request, Response } from 'express';
import { LogInDto } from './dto/logIn.dto';
import { SignUpDto } from './dto/singUp.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/common/types/authenticatedRequest.types';
import { User } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Req() req: Request,
    @Body() _loginDto: LogInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authservice.login(req);
    this.setAuthCookies(res, accessToken, refreshToken);

    return { message: 'Login success' };
  }

  @Post('signup')
  async signUp(
    @Req() req: Request,
    @Body() dto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User> {
    const { accessToken, refreshToken, user } = await this.authservice.signUp(
      dto,
      req,
    );

    this.setAuthCookies(res, accessToken, refreshToken);

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.authservice.logout(req);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return { message: 'Logout success' };
  }

  @Post('refresh')
  async refreshTokens(
    @Req() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authservice.refreshTokens(req);

    //set dei cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 15,
    });

    return { message: 'Access token refreshed!' };
  }

  private setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 15,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }
}
