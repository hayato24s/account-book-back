import { startApiServer } from "./api";
import { connectDatabase } from "./database";
import { logger } from "./logger";

async function main() {
  logger.info("service is starting.");
  await connectDatabase();
  await startApiServer();
  logger.info("ready.");
}

main();
