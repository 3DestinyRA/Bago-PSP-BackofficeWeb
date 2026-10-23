import packageJson from "../package.json";
import { paths } from "./routes/paths";
import { BASE_PATH } from "./utils/base-path";

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
		// Los archivos de public/ se sirven bajo el basePath; `||` y no `??` porque la variable llega como "" cuando no se define.
		assetURL: process.env.NEXT_PUBLIC_ASSETS_URL || BASE_PATH,
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
