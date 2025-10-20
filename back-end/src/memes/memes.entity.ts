import { Comment } from 'src/comments/comments.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('memes')
export class Meme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  cloudinaryPublicId: string;

  @Column({ default: 0 })
  votes: number;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn()
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
}
