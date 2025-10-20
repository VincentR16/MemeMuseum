import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { UserId } from 'src/common/decoretor/userId.decoretor';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateUsers.dto';
import { Roles } from 'src/common/decoretor/roles.decoretor';
import { UserRoles } from 'src/common/types/usersRoles.types';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getMe(@UserId() userId: string): Promise<User> {
    return this.usersService.getMe(userId);
  }

  @Patch()
  async update(@UserId() userId: string, dto: UpdateUserDto) {
    await this.usersService.updateUser(userId, dto);
    return { message: 'update Success' };
  }

  @Delete()
  @Roles(UserRoles.ADMIN)
  async delete(@Param('Id') userId: string) {
    await this.usersService.deleteUser(userId);
  }
}
