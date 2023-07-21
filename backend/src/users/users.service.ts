import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { HashService } from 'src/hash/hash.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  findAll(query: FindManyOptions<User>) {
    return this.userRepository.find(query);
  }

  findOne(query: FindOneOptions<User>) {
    return this.userRepository.findOne(query);
  }

  findByQuery(query: string) {
    return this.findAll({
      where: [{ username: query }, { email: query }],
    });
  }

  async create(createUserDto: CreateUserDto) {
    const { email, username, password } = createUserDto;
    const userEmail = await this.findOne({
      where: [{ email }],
    });
    const userName = await this.findOne({
      where: [{ username }],
    });
    if (userEmail) {
      throw new ConflictException(
        'Пользователь с таким email уже зарегистрирован',
      );
    }
    if (userName) {
      throw new ConflictException(
        'Пользователь с таким именем пользовтеля уже зарегистрирован',
      );
    }

    const hash = await this.hashService.generate(password);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hash,
    });

    return this.userRepository.save(newUser);
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    const { email, username, password } = updateUserDto;

    const user = await this.findOne({ where: { id } });

    if (email) {
      const emailInBase = await this.findOne({ where: { email } });

      if (emailInBase && emailInBase.id !== id) {
        throw new ConflictException(
          'Пользователь с таким email уже зарегистрирован',
        );
      }
    }

    if (username) {
      const userNameInBase = await this.findOne({ where: { username } });

      if (userNameInBase && userNameInBase.id !== id) {
        throw new ConflictException(
          'Пользователь с таким именем пользователя уже зарегистрирован',
        );
      }
    }

    if (password) {
      updateUserDto.password = await this.hashService.generate(password);
    }

    const updateUser = { ...user, ...updateUserDto };
    await this.userRepository.update(id, updateUser);

    return this.findOne({ where: { id } });
  }

  getByUsername(username: string) {
    return this.findOne({ where: { username } }).then((user) =>
      plainToClass(User, user, { excludePrefixes: ['password'] }),
    );
  }

  getMyWishes(userId: number) {
    return this.findOne({
      where: { id: userId },
      relations: { wishes: { owner: true } },
    }).then((user) => user.wishes);
  }

  getUserWishes(username: string) {
    return this.findOne({
      where: { username },
      relations: { wishes: true },
    }).then((user) => user.wishes);
  }
}
