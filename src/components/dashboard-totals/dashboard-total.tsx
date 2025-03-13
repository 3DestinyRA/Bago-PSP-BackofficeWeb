import { Box, Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
	icon: React.ReactNode;
	title: string;
	value: string;
};

export const DashboardTotal = ({ icon, title, value }: Props) => {
	return (
		<Box sx={{ bgcolor: "var(--color-white)", borderRadius: "20px", padding: "20px 17px" }}>
			<Stack direction={"row"} alignItems={"flex-start"} spacing={4}>
				<Stack
					sx={{
						justifyContent: "center",
						alignItems: "center",
						bgcolor: "var(--color-primary)",
						borderRadius: "50%",
						width: "56px",
						height: "56px",
					}}
				>
					{icon}
				</Stack>
				<Stack spacing={2}>
					<Typography variant="body1" color={"var(--color-black)"}>
						{title}
					</Typography>
					<Typography variant="subtitle2" color={"var(--color-black)"}>
						{value}
					</Typography>
				</Stack>
			</Stack>
		</Box>
	);
};
