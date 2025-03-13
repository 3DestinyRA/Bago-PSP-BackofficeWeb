import { LogoIcon } from "@/assets/icons/logo";
import { Stack, Typography } from "@mui/material";
import React from "react";

function VerifyMailPage() {
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
}

export default VerifyMailPage;
