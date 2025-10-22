import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comments.service';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { UserId } from 'src/common/decoretor/userId.decoretor';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Patch(':id')
  update(
    @UserId() userId: string,
    @Param('id') commentId: string,
    @Body() dto: CommentDto,
  ) {
    return this.commentService.update(commentId, userId, dto);
  }

  @Delete(':id')
  delete(@UserId() userId: string, @Param('id') commentId: string) {
    return this.commentService.delete(commentId, userId);
  }
}
