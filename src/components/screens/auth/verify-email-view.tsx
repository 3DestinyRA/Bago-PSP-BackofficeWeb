"use client";

import { LogoIcon } from "@/assets/icons/logo";
import { setSession } from "@/auth/context/jwt";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
	token?: string;
};

export const VerifyEmailView = ({ token }: Props) => {
	const router = useRouter();
	useEffect(() => {
		if (token) {
			setSession(token);
			router.replace("/dashboard");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	return (
		<>
			<Stack spacing={"47px"} sx={{ mb: 5 }}>
				<Stack sx={{ alignItems: "center" }}>
					<LogoIcon />
				</Stack>
				<Typography variant="subtitle1" color={"var(--color-secondary)"}>
					Bienvenido a la gestión de PROCAVI
				</Typography>
			</Stack>
			<Stack sx={{ width: "100%", alignItems: "center" }}>
				<Typography variant="subtitle2" color={"var(--color-black)"}>
					Verificá tu correo electronico
				</Typography>
				<Typography variant="body1" color={"var(--color-black)"}>
					Te hemos enviado un correo con un enlace de verificación
				</Typography>
			</Stack>
		</>
	);
};
