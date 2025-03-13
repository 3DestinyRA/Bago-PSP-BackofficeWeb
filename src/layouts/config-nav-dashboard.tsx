"use client";

import { SvgColor } from "@/components/svg-color/svg-color";
import { CONFIG } from "@/config-global";
import { paths } from "@/routes/paths";

// ------------------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.assetURL}/assets/icons/navbar/${name}.svg`} />
);

// ------------------------------------------------------------------------------

const ICONS = {
  home: icon("ic-home"),
  rates: icon("ic-rates"),
  promotions: icon("ic-promotions"),
};

// ------------------------------------------------------------------------------

export type NavDataType = {
  title: string;
  path?: string;
  icon?: React.ReactNode;
};

export const navData: NavDataType[] = [
  {
    title: "Resumen",
    path: paths.dashboard.root,
    icon: ICONS.home,
  },
  {
    title: "Listado de Pacientes",
    path: paths.dashboard.patients.root,
    icon: ICONS.home,
  },
];
