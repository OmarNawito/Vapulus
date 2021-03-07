import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { UsersService } from './users.service';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('users')
export class UsersController {
    constructor(private userServices: UsersService) {}

    @Get()
    @Roles("Admin")
    getAll(@Req() req) {
        console.log(req.user)
        return this.userServices.getAll();
    }
}
