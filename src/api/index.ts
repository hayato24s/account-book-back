import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { applayRouter } from "./routes";
import { cookieName } from "./utils";
import { checkSession } from "~/usecase/checkSession";
import { SessionRepogitory } from "~/gateway/SessionRepogitory";
import { HttpError, toHttpError } from "./routes/mapper";
import { logger } from "~/logger";

const swaggerDocument = YAML.load(path.resolve(__dirname, "../../spec.yaml"));

export function startApiServer() {
  return new Promise<void>((resolve) => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(cors({
      origin: [/.*/],
      credentials: true,
    }));

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use(async (req, _, next) => {
      if (
        req.originalUrl.startsWith("/user/create") ||
        req.originalUrl.startsWith("/user/unique") ||
        req.originalUrl.startsWith("/auth/login")
      ) {
        next();
      } else {
        try {
          // @ts-ignore
          req.userId = await checkSession(
            new SessionRepogitory(),
            req.cookies[cookieName]
          );
          next();
        } catch (e) {
          next(toHttpError(e));
        }
      }
    });

    applayRouter(app);

    app.use(
      (err: HttpError, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status).json({
          message: err.message,
          errors: err.errors,
        });
      }
    );

    const port = 8080;
    app.listen(port, () => {
      logger.info("api server started.");
      resolve();
    });
  });
}
