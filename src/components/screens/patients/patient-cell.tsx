import { Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
	value: string;
};

export const PatientCell = ({ value }: Props) => {
	return (
		<Stack justifyContent={"center"} height={"100%"} minHeight={40}>
			<Typography
				variant="body1"
				color={"var(--color-black)"}
				sx={{
					overflow: "hidden",
					whiteSpace: "normal",
					display: "block",
					textWrap: "balance",
					wordBreak: "break-all",
				}}
			>
				{value}
			</Typography>
		</Stack>
	);
};
