import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  RelationId,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
// import User from '../users/user.entity';
// import Category from '../categories/category.entity';
// import Comment from '../comments/comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public title: string;

  @Column('text', { array: true })
  public paragraphs: string[];

  //   @Index('post_authorId_index')
  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  //   @RelationId((post: Post) => post.author)
  //   public authorId: number;

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories: Category[];

  //   @OneToMany(() => Comment, (comment: Comment) => comment.post)
  //   public comments: Comment[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  scheduledDate?: Date;

  @Column({
    nullable: true,
  })
  category?: string;
}
