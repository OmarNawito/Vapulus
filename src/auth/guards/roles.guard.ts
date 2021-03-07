import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private userServices: UsersService
    ) { }
    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) return false;


        console.log(["roles", roles]);
        const request = context.switchToHttp().getRequest();

        const user = await this.userServices.findByEmail(request.user.email);

        if (user && roles.some((role) => role == user.role.roleName))
            return true;
        else
            throw new HttpException("Unauthorized route", HttpStatus.UNAUTHORIZED)
    }
}
