"use client";

import { NavDataType } from "@/layouts/config-nav-dashboard";
import { Button, List, Typography } from "@mui/material";
import { NavListItem } from "./nav-list-item";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { signOut } from "@/auth/context/jwt";
import { toast } from "sonner";
import { useAuthContext } from "@/auth/hooks";
import { LogoutIcon } from "@/assets/icons/logout-icon";

type NavSectionProps = {
	data: NavDataType[];
};

export const NavSection = ({ data }: NavSectionProps) => {
	const { checkUserSession } = useAuthContext();
	const router = useRouter();

	const handleLogout = useCallback(async () => {
		try {
			await signOut();
			await checkUserSession?.();

			router.refresh();
		} catch (error) {
			console.error(error);
			toast.error("Error al cerrar sesion");
		}
	}, [checkUserSession, router]);

	return (
		<List sx={{ height: "100%" }}>
			{data?.map((item) => (
				<NavListItem key={item.title} {...item} />
			))}
			{true ? (
				<Button
					onClick={handleLogout}
					disableRipple
					style={{
						display: "flex",
						justifyContent: "flex-start",
						width: "100%",
						position: "absolute",
						bottom: "20px",
						gap: "10px",
					}}
				>
					<LogoutIcon />
					<Typography variant="navitem" color={"rgba(128, 128, 128, 0.55)"} textTransform={"capitalize"}>
						Cerrar Sesion
					</Typography>
				</Button>
			) : null}
		</List>
	);
};
