import { compareSync, hash } from "bcrypt";

import { UnauthorizedException } from "../../helpers/exceptions";
import { UserService } from "../user/user.service";
import { config } from "../../config";
import { sign } from "jsonwebtoken";

export class AuthService {
  private readonly userService: UserService = new UserService();

  async login(username: string, password: string) {
    const user = await this.userService.getByUsername(username);

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }

    return this.generateTokens(user);
  }

  async register(username: string, password: string) {
    const hashedPassword = await hash(password, 10);

    const user = await this.userService.create({
      username,
      password: hashedPassword,
    });

    return this.generateTokens(user);
  }

  generateTokens(user: { id: number; username: string }) {
    const accessToken = sign(
      { id: user.id, username: user.username },
      config.auth.accessTokenSecret,
      {
        expiresIn: "1d",
      }
    );

    const refreshToken = sign(
      {
        id: user.id,
        username: user.username,
      },
      config.auth.refreshTokenSecret,
      {
        expiresIn: "7d",
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
