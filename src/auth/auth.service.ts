import { Injectable } from '@nestjs/common';
import { JwtService } from  '@nestjs/jwt';
import { UserService } from  '../auth/user.service';
import { User } from  './user.entity';
import { AuthModule } from './auth.module'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    
    private async validate(userData: User): Promise<User> {
        return await this.userService.findByUser(userData.username)
    }

    public async login(user: User): Promise< any | { status: number }>{
        return this.validate(user).then((userData)=>{
          if(!userData){
            return { status: 404 };
          }
          // let payload = `${userData.username}${userData.id}`;
          let payload = `${userData.id}`;
          const accessToken = this.jwtService.sign(payload);

          return {
             expires_in: 300,
             access_token: accessToken,
             user_id: payload,
             status: 200,
             date: Date()
          };

        });
    }

    public async register(user: User): Promise<any>{
        return this.userService.create(user)
    } 
}
