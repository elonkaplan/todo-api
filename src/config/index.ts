import { configDotenv } from "dotenv";
import { schema } from "./schema";

configDotenv();

const { value: envVars, error } = schema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  app: {
    port: envVars.APP_PORT,
  },
  auth: {
    accessTokenSecret: envVars.AUTH_ACCESS_TOKEN_SECRET,
    refreshTokenSecret: envVars.AUTH_REFRESH_TOKEN_SECRET,
  },
};
