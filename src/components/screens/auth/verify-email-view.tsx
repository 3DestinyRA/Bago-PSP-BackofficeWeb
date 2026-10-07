"use client";

import { LogoIcon } from "@/assets/icons/logo";
import { Stack, Typography } from "@mui/material";
import React from "react";

/**
 * Pantalla posterior a pedir el ingreso. El link del mail NO entra por acá: va a
 * `/api/auth/verify`, que valida el token en el servidor y crea la sesión.
 */
export const VerifyEmailView = () => {
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
			<Stack sx={{ width: "100%", alignItems: "center" }} spacing={1}>
				<Typography variant="subtitle2" color={"var(--color-black)"}>
					Revisá tu correo electrónico
				</Typography>
				<Typography variant="body1" color={"var(--color-black)"} textAlign={"center"}>
					Si el mail corresponde a un operador del programa, te enviamos un enlace para entrar. Vence en 15 minutos.
				</Typography>
			</Stack>
		</>
	);
};
