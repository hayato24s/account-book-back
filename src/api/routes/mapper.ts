import { Express } from "express";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "~/error";
import { logger } from "~/logger";

type HttpMethodType = "get" | "post" | "put" | "delete";

const HttpMethods: HttpMethodType[] = ["get", "post", "put", "delete"];

type ApiDefinition = Record<string, any>;

export type GetParams<
  DEF extends ApiDefinition,
  PATH extends keyof DEF,
  METHOD extends keyof DEF[PATH]
> = DEF[PATH][METHOD] extends { parameters: { path: infer PARAMS } }
  ? { params: PARAMS }
  : Record<string, never>;

export type GetQuery<
  DEF extends ApiDefinition,
  PATH extends keyof DEF,
  METHOD extends keyof DEF[PATH]
> = DEF[PATH][METHOD] extends { parameters: { query: infer QUERY } }
  ? { query: QUERY }
  : Record<string, never>;

export type GetReqBody<
  DEF extends ApiDefinition,
  PATH extends keyof DEF,
  METHOD extends keyof DEF[PATH]
> = DEF[PATH][METHOD] extends {
  requestBody: { content: { "application/json": infer ReqBody } };
}
  ? { body: ReqBody }
  : Record<string, never>;

type HaveNotUserIdPathType = "/user/create" | "/user/unique" | "/auth/login";

export type GetUserId<
  DEF extends ApiDefinition,
  PATH extends keyof DEF
> = PATH extends HaveNotUserIdPathType
  ? Record<string, never>
  : { userId: string };

export type ApiRequest<
  DEF extends ApiDefinition,
  PATH extends keyof DEF,
  METHOD extends keyof DEF[PATH]
> = GetParams<DEF, PATH, METHOD> &
  GetQuery<DEF, PATH, METHOD> &
  GetReqBody<DEF, PATH, METHOD> &
  GetUserId<DEF, PATH>;

export type ApiResponse<
  DEF extends ApiDefinition,
  PATH extends keyof DEF,
  METHOD extends keyof DEF[PATH][METHOD]
> = DEF[PATH][METHOD] extends { responses: { [key: number]: any } }
  ? Promise<
      {
        [K in keyof DEF[PATH][METHOD]["responses"]]: DEF[PATH][METHOD]["responses"][K] extends never
          ? { status: K }
          : {
              body: DEF[PATH][METHOD]["responses"]["content"]["application/json"];
              status: K;
            };
      }[keyof DEF[PATH][METHOD]["responses"]]
    >
  : Record<string, never>;

type ApiHandler<
  DEF extends ApiDefinition,
  PATH extends keyof DEF,
  METHOD extends keyof DEF[PATH]
> = (req: ApiRequest<DEF, PATH, METHOD>) => ApiResponse<DEF, PATH, METHOD>;

type ServerImplementation<DEF extends ApiDefinition> = {
  [PATH in keyof DEF]: {
    [METHOD in keyof DEF[PATH]]: ApiHandler<DEF, PATH, METHOD>;
  };
};

export type PartialServerImplementation<
  DEF extends ApiDefinition,
  PATHS extends keyof DEF
> = {
  [PATH in PATHS]: {
    [METHOD in keyof DEF[PATH]]: ApiHandler<DEF, PATH, METHOD>;
  };
};

export function mapToExpress<T extends ApiDefinition>(
  app: Express,
  impl: ServerImplementation<T>
) {
  Object.keys(impl).forEach((path) => {
    HttpMethods.filter((method) => impl[path].hasOwnProperty(method)).forEach(
      (method: HttpMethodType) => {
        logger.debug(`${method.toUpperCase()} ${path}`)
        app[method](
          path.replace(/{([a-z]+)}/, (_, p) => `:${p}`),
          async (req, res, next) => {
            try {
              // @ts-ignore
              const result = await impl[path][method]({
                body: req.body,
                params: req.params,
                // @ts-ignore
                userId: req.userId,
              });
              // @ts-ignore
              if (result.cookie)
                res.cookie(
                  // @ts-ignore
                  result.cookie.name,
                  // @ts-ignore
                  result.cookie.value,
                  // @ts-ignore
                  result.cookie.options
                );
              // @ts-ignore
              res.status(result.status);
              // @ts-ignore
              res.json(result.body);
            } catch (e) {
              next(toHttpError(e));
            }
          }
        );
      }
    );
  });
}

export type HttpError = {
  status: number;
  message: string;
  errors: Error[];
};

export function toHttpError(e: Error): HttpError {
  if (e instanceof BadRequestError) {
    return {
      status: 400,
      message: e.message,
      errors: [e],
    };
  } else if (e instanceof UnauthorizedError) {
    return {
      status: 401,
      message: e.message,
      errors: [e],
    };
  } else if (e instanceof NotFoundError) {
    return {
      status: 404,
      message: e.message,
      errors: [e],
    };
  } else {
    const err = new InternalServerError(e.message);
    return {
      status: 500,
      message: err.message,
      errors: [err],
    };
  }
}
