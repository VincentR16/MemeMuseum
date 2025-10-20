import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Meme } from 'src/memes/meme.entity';

@Entity('votes')
@Unique(['user', 'meme'])
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.votes, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Meme, (meme) => meme.votes, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  meme: Meme;

  @Column()
  memeId: string;

  @Column({
    type: 'enum',
    enum: ['upvote', 'downvote'],
  })
  voteType: 'upvote' | 'downvote';

  @CreateDateColumn()
  createdAt: Date;
}
