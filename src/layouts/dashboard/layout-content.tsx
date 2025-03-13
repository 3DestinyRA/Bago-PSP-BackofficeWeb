import { Box, Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
	breadcrumbText?: string;
	title: string;
	children: React.ReactNode;
};

export const LayoutContent = ({ breadcrumbText, title, children }: Props) => {
	return (
		<Box
			sx={{
				bgcolor: "#F4F4F4",
				height: "100%",
				paddingTop: "47px",
				paddingX: "30px",
				overflow: "hidden",
			}}
		>
			<Stack spacing={2}>
				<Typography variant="body1" color={"var(--color-black)"}>
					{breadcrumbText}
				</Typography>
				<Typography variant="subtitle1" color={"var(--color-secondary)"}>
					{title}
				</Typography>
			</Stack>
			<Box sx={{ marginTop: "33px", marginBottom: "86px" }}>{children}</Box>
		</Box>
	);
};
