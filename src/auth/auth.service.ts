import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async login(user: LoginDto) {
        try {
            const userFind = await this.usersService.findByEmail(user.email);

            if (userFind && await userFind.comparePassword(user.password)) {
                const payload = { email: userFind.email };
                const access_token = this.jwtService.sign(payload);
                const { password, ...user } = userFind.toJSON();
                return {
                    ...user,
                    access_token,
                };
            }
            else
                throw new UnauthorizedException("Invalid email / password");

        } catch (error) {
            throw error;
        }
    }

    async register(user: RegisterDto) {
        try {
            const userNew = await this.usersService.create(user);
            return userNew;
        } catch (error) {
            throw new ConflictException("email already exists");
        }
    }

    async validateUser(payload) {
        const user = await this.usersService.findByEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
