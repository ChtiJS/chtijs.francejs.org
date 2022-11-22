import getConfig from "next/config";

export type GlobalConfig = {
  publicRuntimeConfig: {
    environment: string;
    buildPrefix: string;
    baseURL: string;
  };
};

const config = getConfig() || {};

const { publicRuntimeConfig } = config as GlobalConfig;

export { publicRuntimeConfig };
export default config;
