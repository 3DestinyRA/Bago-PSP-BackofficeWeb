"use client";

import { createTheme } from "@mui/material";

const theme = createTheme({
	typography: {
		fontFamily: "var(--font-poppins)",
		navitem: {
			fontSize: "16px",
			fontStyle: "normal",
			fontWeight: 500,
		},
		textbutton: {
			fontSize: "18px",
			fontStyle: "normal",
			fontWeight: 500,
		},
		subtitle1: {
			fontSize: "34px",
			fontStyle: "normal",
			fontWeight: 600,
		},
		subtitle2: {
			fontSize: "24px",
			fontStyle: "normal",
			fontWeight: 700,
		},
		caption: {
			fontSize: "18px",
			fontStyle: "normal",
			fontWeight: 700,
		},
		caption2: {
			fontSize: "20px",
			fontStyle: "normal",
			fontWeight: 600,
		},
		caption3: {
			fontSize: "16px",
			fontStyle: "normal",
			fontWeight: 600,
		},
		body1: {
			fontSize: "14px",
			fontStyle: "normal",
			fontWeight: 500,
		},
		body2: {
			fontSize: "12px",
			fontStyle: "normal",
			fontWeight: 400,
		},
	},
	spacing: (factor: number) => {
		const values = [0, 2, 4, 6, 8, 10, 12, 14, 16, 24, 32, 64, 128, 256, 512, 1024, 2048];
		const index = Math.floor(factor);
		const currentSpace = values[index];
		const nextSpace = values[index + 1] || currentSpace * 2;
		const space = currentSpace + (nextSpace - currentSpace) * (factor - index);
		return `${space}px`;
	},
});

export default theme;
