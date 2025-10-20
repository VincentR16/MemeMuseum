import { Exclude } from 'class-transformer';
import { Session } from 'src/auth/session.entity';
import { Comment } from 'src/comments/comment.entity';
import { UserRoles } from 'src/common/types/usersRoles.types';
import { Meme } from 'src/memes/meme.entity';
import { Vote } from 'src/votes/vote.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column({})
  gender: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @OneToMany(() => Session, (session) => session.user, {
    onDelete: 'CASCADE',
    eager: false,
  })
  session: Session[];

  @OneToMany(() => Meme, (meme) => meme.user, {})
  memes: Meme[];

  @OneToMany(() => Comment, (comment) => comment.user, {})
  comments: Comment[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];
}
