import { AuthGuard } from "@/auth/auth-guard";
import { CONFIG } from "@/config-global";
import { DashboardLayout } from "@/layouts/dashboard/dashboard-layout";
import React from "react";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
	if (CONFIG.auth.skip) {
		return <DashboardLayout>{children}</DashboardLayout>;
	}

	return (
		<AuthGuard>
			<DashboardLayout>{children}</DashboardLayout>
		</AuthGuard>
	);
}
