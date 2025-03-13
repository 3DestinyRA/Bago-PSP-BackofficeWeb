"use client";
import { NavDataType, navData as dashboardNavData } from "../config-nav-dashboard";
export type DashboardLayoutProps = {
	children: React.ReactNode;
	data?: {
		nav?: NavDataType[];
	};
};

export const DashboardLayout = ({ children, data }: DashboardLayoutProps) => {
	const navData = data?.nav ?? dashboardNavData;

	return (
		<div>
			{navData.map((item) => (
				<div key={item.title}>{item.title}</div>
			))}
			<div>{children}</div>
		</div>
	);
};
