import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto })
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id : id } });

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email : email } });

    if (!user) throw new NotFoundException(`User with email ${email} not found`);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findById(id);

    return this.prisma.user.update({
      where: { id : id },
      data: updateUserDto,
    });
  }

  async delete(id: number) {
    await this.findById(id);

    return this.prisma.user.delete({ where: { id : id }});
  }
}
