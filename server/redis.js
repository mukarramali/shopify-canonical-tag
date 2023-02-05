import Redis from "ioredis";
import { REDIS_URI } from "../app/environment";

export const redisClient = new Redis(REDIS_URI);
