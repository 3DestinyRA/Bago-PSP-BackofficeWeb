"use client";

import { ReactNode, Suspense } from "react";
import { Toaster } from "sonner";
import { LoadingScreen } from "@/components/loading-screen";
import { AuthProvider } from "@/auth/context/jwt";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";

export const BaseLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<AppRouterCacheProvider options={{ key: "css" }}>
				<AuthProvider>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Toaster position="top-center" richColors />
						{children}
					</ThemeProvider>
				</AuthProvider>
			</AppRouterCacheProvider>
		</Suspense>
	);
};
