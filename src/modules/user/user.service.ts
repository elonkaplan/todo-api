import { Prisma } from "@prisma/client";
import { prisma } from "../../connection";

export class UserService {
  async getById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async getByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  }

  async create(user: Prisma.UserCreateInput) {
    const newUser = await prisma.user.create({
      data: user,
    });

    return newUser;
  }

  async update(id: number, user: any) {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: user,
    });

    return updatedUser;
  }

  async delete(id: number) {
    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });

    return deletedUser;
  }
}
