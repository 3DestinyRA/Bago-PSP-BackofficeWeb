import type { BoxProps } from "@mui/material/Box";

import { m } from "framer-motion";

import Box from "@mui/material/Box";
import { LogoAnimated } from "@/assets/icons/big-logo";

// ----------------------------------------------------------------------

export type AnimateLogoProps = BoxProps & {
	logo?: React.ReactNode;
};

export function AnimateLogo1({ logo, sx, ...other }: AnimateLogoProps) {
	return (
		<Box
			sx={{
				width: 120,
				height: 120,
				alignItems: "center",
				position: "relative",
				display: "inline-flex",
				justifyContent: "center",
				...sx,
			}}
			{...other}
		>
			<Box
				component={m.div}
				animate={{ scale: [1, 0.9, 0.9, 1, 1], opacity: [1, 0.48, 0.48, 1, 1] }}
				transition={{
					duration: 2,
					repeatDelay: 1,
					repeat: Infinity,
					ease: "easeInOut",
				}}
				sx={{ display: "inline-flex" }}
			>
				{logo ?? <LogoAnimated />}
			</Box>
		</Box>
	);
}
