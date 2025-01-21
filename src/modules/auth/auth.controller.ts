import { Controller, ERequestType } from "../../helpers/types";

import { AuthService } from "./auth.service";

export class AuthController {
  private readonly authService: AuthService = new AuthService();

  login: Controller = async (req, res) => {
    res.send(
      await this.authService.login(req.body.username, req.body.password)
    );
  };

  register: Controller = async (req, res) => {
    res.send(
      await this.authService.register(req.body.username, req.body.password)
    );
  };

  me: Controller<ERequestType.Authenticated> = async (req, res) => {
    res.send({
      id: req.user.id,
      username: req.user.username,
    });
  };

  logout: Controller<ERequestType.Authenticated> = async (_, res) => {
    res.send({
      success: true,
    });
  };

  refresh: Controller<ERequestType.Authenticated> = async (req, res) => {
    res.send(
      this.authService.generateTokens({
        id: req.user.id,
        username: req.user.username,
      })
    );
  };
}
