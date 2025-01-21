import chalk from "chalk";
import morgan from "morgan";

export const logger = morgan(function (tokens, req, res) {
  const color =
    Number(tokens.status(req, res) || 200) >= 400 ? "#ff5252" : "#2ed573";

  const text = [
    chalk.bold(tokens.method(req, res)),
    chalk.bold(tokens.status(req, res)),
    chalk.bold(tokens.url(req, res)),
    chalk.bold(tokens["response-time"](req, res) + " ms"),
    chalk.bold("@ " + tokens.date(req, res)),
    tokens["remote-addr"](req, res),
    chalk.bold("from " + tokens.referrer(req, res)),
    tokens["user-agent"](req, res),
  ];

  return chalk.hex(color)([...text].join(" "));
});
