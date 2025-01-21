import { NotFoundException } from "../../helpers/exceptions";
import { Prisma } from "@prisma/client";
import { prisma } from "../../connection";

export class TaskService {
  async getByIdAndUserId(id: number, userId: number) {
    return prisma.task.findUnique({
      where: {
        id,
        userId,
      },
    });
  }

  async getByUserId(userId: number) {
    return prisma.task.findMany({
      where: {
        userId,
      },
    });
  }

  async create(task: Prisma.TaskCreateInput) {
    return prisma.task.create({
      data: task,
    });
  }

  async update(id: number, task: Prisma.TaskUpdateInput, userId: number) {
    const taskExists = await this.getByIdAndUserId(id, userId);

    if (!taskExists) {
      throw new NotFoundException("Task not found");
    }

    return prisma.task.update({
      where: {
        id,
      },
      data: task,
    });
  }

  async delete(id: number, userId: number) {
    const taskExists = await this.getByIdAndUserId(id, userId);

    if (!taskExists) {
      throw new NotFoundException("Task not found");
    }

    return prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
