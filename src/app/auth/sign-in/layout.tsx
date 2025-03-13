// ----------------------------------------------------------------------

import { Stack } from "@mui/material";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
	return (
		<Stack
			sx={{
				width: "100%",
				height: "100dvh",
				overflow: "hidden",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{children}
		</Stack>
	);
}
