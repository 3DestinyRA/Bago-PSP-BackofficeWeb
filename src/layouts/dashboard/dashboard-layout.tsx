"use client";
import { Box, Stack } from "@mui/material";
import { NavDataType, navData as dashboardNavData } from "../config-nav-dashboard";
import { NavSection } from "@/components/nav-section/nav-section";
import { LogoIcon } from "@/assets/icons/logo";
export type DashboardLayoutProps = {
	children: React.ReactNode;
	data?: {
		nav?: NavDataType[];
	};
};

export const DashboardLayout = ({ children, data }: DashboardLayoutProps) => {
	const navData = data?.nav ?? dashboardNavData;

	return (
		<Box
			sx={{
				display: "flex",
				height: "100vh",
			}}
		>
			<Stack sx={{ widht: "290px", flex: "none", paddingX: "38px" }}>
				<Stack sx={{ alignItems: "center", marginTop: "27px", marginBottom: "55px" }}>
					<LogoIcon width="46px" height="56px" />
				</Stack>
				<NavSection data={navData} />
			</Stack>
			<Box sx={{ flexGrow: 1 }}>{children}</Box>
		</Box>
	);
};
