import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtBlackList } from '../entities/jwtBlackList.entity';

@Injectable()
export class BlackListService {
    constructor(
        @InjectRepository(JwtBlackList)
        private readonly jwtBlackListRepository: Repository<JwtBlackList>,
    ) {}

    async tokenIsBlacklisted(token: string): Promise<boolean> {
        const blacklisted = await this.jwtBlackListRepository.findOne({
            jwtToken: token,
        });
        return !!blacklisted;
    }
    async tokenSetBlackList(token: string): Promise<void> {
        const tokenCreate = this.jwtBlackListRepository.create({
            jwtToken: token,
        });
        await this.jwtBlackListRepository.save(tokenCreate);
    }
}
