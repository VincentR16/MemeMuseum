import { Exclude } from 'class-transformer';
import { Session } from 'src/auth/session.entity';
import { UserRoles } from 'src/common/types/users.Roles';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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

  @Column({ type: 'enum', enum: UserRoles })
  role: UserRoles;

  @Column()
  @Exclude()
  password: string;

  @Exclude()
  @OneToMany(() => Session, (session) => session.user, {
    nullable: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  session: Session[];
}
