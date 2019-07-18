import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findByUser(username: string): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                username: username,
            }
        });
    }
    // async findByUser(email: string): Promise<User> {
    //     return await this.userRepository.findOne({
    //         where: {
    //             username: email,
    //         }
    //     });
    // }

    async findById(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                id: id,
            }
        });
    }

    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }
}
