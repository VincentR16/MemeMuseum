import { Meme } from 'src/memes/meme.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: 0 })
  count: number;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
  })
  createdAt: Date;

  @ManyToMany(() => Meme, (meme) => meme.tags, { nullable: true })
  memes: Meme[];
}

//? forse serve fare un specie di paginazione anche per i tag perche se sono troppi
//? è un problema , da vedere piu avanti per il momento va bene
