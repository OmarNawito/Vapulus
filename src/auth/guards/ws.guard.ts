import { Injectable, CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWT_TOKEN_SECRET } from 'src/enviroments';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class WsGuard implements CanActivate {

    constructor(private userService: UsersService) {
    }

    canActivate(
        context: any,
    ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
        const bearerToken = context.args[0].handshake.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(bearerToken, JWT_TOKEN_SECRET) as any;
            return new Promise((resolve, reject) => {
                return this.userService.findByEmail(decoded.email).then(user => {
                    if (user) {
                        context.switchToHttp().getRequest().user = user
                        resolve(user);
                    } else {
                        reject(false);
                    }
                });

            });
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }
}