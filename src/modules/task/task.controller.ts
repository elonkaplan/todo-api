import { Controller, ERequestType } from "../../helpers/types";

import { TaskService } from "./task.service";

export class TaskController {
  private readonly taskService: TaskService = new TaskService();

  getTasks: Controller<ERequestType.Authenticated> = async (req, res) => {
    res.send(await this.taskService.getByUserId(req.user.id));
  };

  getTask: Controller<ERequestType.Authenticated> = async (req, res) => {
    res.send(
      await this.taskService.getTask(Number(req.params.id), req.user.id)
    );
  };

  createTask: Controller<ERequestType.Authenticated> = async (req, res) => {
    res.send(
      await this.taskService.create({ ...req.body, userId: req.user.id })
    );
  };

  updateTask: Controller<ERequestType.Authenticated> = async (req, res) => {
    res.send(
      await this.taskService.update(
        Number(req.params.id),
        req.body,
        req.user.id
      )
    );
  };

  deleteTask: Controller<ERequestType.Authenticated> = async (req, res) => {
    res.send(await this.taskService.delete(Number(req.params.id), req.user.id));
  };
}
