import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from './users.entity';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}

  public create(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  public findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  public findOne(uid: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ uid });
  }

  public update(uid: number, user: UserEntity) {
    user = Object.setPrototypeOf(user, {});
    return this.userRepository.update(uid, user);
    // const qb = this.userRepository.createQueryBuilder('user');
    // return qb.update(UserEntity).setParameters(user).where("user.id = :id", { id: uid }).execute();
  }

  public delete(uid: number) {
    return this.userRepository.delete(uid);
  }
}
