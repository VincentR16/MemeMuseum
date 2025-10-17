import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../common/guard/local-auth.guard';
import { Request, Response } from 'express';
import { LogInDto } from './dto/logIn.dto';
import { SignUpDto } from './dto/singUp.dto';

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

  @Post('/signup')
  async signUp(
    @Req() req: Request,
    @Body() dto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authservice.signUp(
      dto,
      req,
    );

    this.setAuthCookies(res, accessToken, refreshToken);

    return { message: 'SignUp success' };
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
