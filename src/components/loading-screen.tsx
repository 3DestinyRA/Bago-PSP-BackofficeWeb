import { Box, CircularProgress } from "@mui/material";
import React from "react";

export const LoadingScreen = () => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
			}}
		>
			<CircularProgress size={100} />
		</Box>
	);
};
