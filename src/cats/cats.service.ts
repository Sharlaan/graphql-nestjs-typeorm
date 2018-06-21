import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import CatEntity from './cats.entity';
import { ICat } from './interfaces/cat.interface';

@Injectable()
export default class CatsService {
  constructor(@InjectRepository(CatEntity) private readonly catRepository: Repository<CatEntity>) {}

  public create(cat: ICat): Promise<CatEntity> {
    return this.catRepository.save(cat);
  }

  public findAll(): Promise<CatEntity[]> {
    return this.catRepository.find();
  }

  public findOne(id: number): Promise<CatEntity | undefined> {
    return this.catRepository.findOne({ id });
  }

  public findCatsByUserId(userId: number): Promise<CatEntity[]> {
    return this.catRepository.find({ userId });
  }

  public update(id: number, cat: ICat) {
    return this.catRepository.update(id, cat);
  }

  public delete(id: number) {
    return this.catRepository.delete(id);
  }
}
