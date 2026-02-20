import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends Strategy {
  constructor(private authService: AuthService) {
    super(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
          return done(null, false, { message: 'Invalid email or password' });
        }
        done(null, user);
      },
    );
  }
}