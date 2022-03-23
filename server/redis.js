import { createClient } from "redis";
import { REDIS_PASSWORD, REDIS_SERVER } from "../app/environment";

export const redisClient = createClient({
  url: `redis://:${REDIS_PASSWORD}@${REDIS_SERVER}:20730`,
});
