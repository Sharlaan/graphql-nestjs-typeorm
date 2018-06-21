import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class CatEntity {
  @PrimaryGeneratedColumn() public id!: number;

  @Column({ length: 50 })
  public name!: string;

  @Column() public age!: number;

  @Column() public userId!: number;
}
