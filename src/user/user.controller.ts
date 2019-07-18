import { Controller, Logger,Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
    private logger = new Logger("UserController");
    constructor(private userService: UserService){}

    @Get()
    async showUsers(){
        const user = await this.userService.showAll();
        return(user);
    }

    @Post()
    async create(@Body() formData: UserEntity): Promise<any> {
      return this.userService.create(formData);
    }  
    
}
