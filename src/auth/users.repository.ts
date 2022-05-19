import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await genSalt();
    const hashPassword = await hash(password, salt);

    const user = this.create({ username, password: hashPassword });

    try {
      await this.save(user);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
