/* eslint-disable react/display-name */
"use client";

import { forwardRef } from "react";
import { Icon } from "@iconify/react";

import { iconifyClasses } from "./classes";

import type { IconifyProps } from "./types";

// ----------------------------------------------------------------------

export const Iconify = forwardRef<SVGElement, IconifyProps>(({ className, width = 20, ...other }) => {
	const baseStyles = {
		width,
		height: width,
		flexShrink: 0,
		display: "inline-flex",
	};

	return (
		<Icon
			className={iconifyClasses.root.concat(className ? ` ${className}` : "")}
			style={{ ...baseStyles }}
			{...other}
		/>
	);
});
