import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address) private addressesRepository: Repository<Address>,
  ) {}

  async getAllAddressesWithUsers() {
    return await this.addressesRepository.find({ relations: ['user'] });
  }
}
