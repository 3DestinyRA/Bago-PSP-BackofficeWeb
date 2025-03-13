import packageJson from "../package.json";
import { paths } from "./routes/paths";

export type ConfigValue = {
  site: {
    name: string;
    serverURL: string;
    assetURL: string;
    basePath: string;
    version: string;
    adminUrl: string;
  };
  auth: {
    method: "jwt";
    skip: boolean;
    redirectPath: string;
  };
};

// ------------------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  site: {
    name: "Bago Backoffice",
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL ?? "",
    assetURL: process.env.NEXT_PUBLIC_ASSETS_URL ?? "",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
    version: packageJson.version,
    adminUrl: process.env.NEXT_PUBLIC_ADMIN_URL ?? "",
  },
  auth: {
    method: "jwt",
    skip: false,
    redirectPath: paths.dashboard.root,
  },
};
