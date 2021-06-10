import { configure, getLogger } from 'log4js';

const config = {
  appenders: { std: { type: "stdout"} },
  categories: { default: { appenders: ["std"], level: "debug" } }
}

configure(config);

export const logger = getLogger();