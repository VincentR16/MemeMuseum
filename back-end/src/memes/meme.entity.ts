import { Comment } from 'src/comments/comment.entity';
import { Tag } from 'src/tags/tag.entity';
import { User } from 'src/users/user.entity';
import { Vote } from 'src/votes/vote.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
} from 'typeorm';

@Entity('memes')
export class Meme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column()
  cloudinaryImageUrl: string;

  @Column()
  cloudinaryPublicId: string;

  @OneToMany(() => Vote, (vote) => vote.meme)
  votes: Vote[];

  @Column({ default: 0 })
  votesCount: number;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.memes, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => Comment, (comment) => comment.meme, { cascade: true })
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.memes, { nullable: true })
  tags: Tag[];
}
