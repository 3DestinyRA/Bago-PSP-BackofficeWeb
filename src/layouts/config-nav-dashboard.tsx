"use client";

import { SvgColor } from "@/components/svg-color/svg-color";
import { CONFIG } from "@/config-global";
import { paths } from "@/routes/paths";

// ------------------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`${CONFIG.site.assetURL}/assets/icons/${name}.svg`} />;

// ------------------------------------------------------------------------------

export const ICONS = {
	home: icon("ic-resume"),
	patients: icon("ic-patients"),
};

// ------------------------------------------------------------------------------

export type NavDataType = {
	title: string;
	path?: string;
	icon?: string;
};

export const navData: NavDataType[] = [
	{
		title: "Resumen",
		path: paths.dashboard.root,
		icon: "resume",
	},
	{
		title: "Listado de Pacientes",
		path: paths.dashboard.patients.root,
		icon: "patients",
	},
];
