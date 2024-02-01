import "express-async-errors";
import { ServerApplication } from "./infrastructure/rest-api/server";

const bootstrapp = async () => {
  const server = new ServerApplication();
  await server.start(3000);
};

bootstrapp();
