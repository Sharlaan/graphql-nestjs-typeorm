import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class UserEntity {
  @PrimaryGeneratedColumn() public uid!: number;

  @Column({ length: 50 })
  public username!: string;

  @Column() public password!: string;

  @Column({ length: 50 })
  public email!: string;
}
