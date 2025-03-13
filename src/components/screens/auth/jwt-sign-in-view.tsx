"use client";

import * as zod from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signInWithEmail } from "@/auth/context/jwt";
import { Alert, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Field, Form } from "@/components/form";
import { LogoIcon } from "@/assets/icons/logo";

// ----------------------------------------------------------------------

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
	email: zod
		.string()
		.min(1, { message: "Debe ingresar un email!" })
		.email({ message: "Debe ingresar un email válido" }),
});

// ----------------------------------------------------------------------

export function JwtSignInView() {
	const router = useRouter();

	const [errorMsg, setErrorMsg] = useState("");

	const defaultValues = {
		email: "",
	};

	const methods = useForm<SignInSchemaType>({
		resolver: zodResolver(SignInSchema),
		defaultValues,
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	const onSubmit = handleSubmit(async (data) => {
		try {
			await signInWithEmail({ email: data.email });
			router.push("/auth/sign-in/verify-email");
		} catch (error) {
			console.error("Error signing view", error);
			setErrorMsg(error instanceof Error ? error.message : "Email incorrecto");
		}
	});

	const renderHead = (
		<Stack spacing={"47px"} sx={{ mb: 5 }}>
			<Stack sx={{ alignItems: "center" }}>
				<LogoIcon />
			</Stack>
			<Typography variant="subtitle1" color={"var(--color-secondary)"}>
				Bienvenido a la gestión de PROCAVI
			</Typography>
		</Stack>
	);

	const renderForm = (
		<Stack sx={{ mt: "47px", width: "338px" }}>
			<Stack spacing={6}>
				<Typography variant="caption" color={"var(--color-primary)"} textAlign={"center"}>
					Email
				</Typography>
				<Field.Text name="email" placeholder="example@example.com" />
			</Stack>

			<Button
				fullWidth
				type="submit"
				style={{
					marginTop: 110,
				}}
				sx={{
					"&.MuiButton-contained": {
						backgroundColor: "var(--color-primary)",
						borderRadius: 50,
						py: "10px",
						px: "14px",
						textTransform: "capitalize",
					},
				}}
				variant="contained"
			>
				{isSubmitting ? (
					<CircularProgress size={32} thickness={2} color="inherit" />
				) : (
					<Typography variant="textbutton">Continuar</Typography>
				)}
			</Button>
		</Stack>
	);

	return (
		<>
			{renderHead}

			{!!errorMsg && (
				<Alert severity="error" sx={{ mb: 3 }}>
					{errorMsg}
				</Alert>
			)}

			<Stack sx={{ width: "100%", alignItems: "center" }}>
				<Form methods={methods} onSubmit={onSubmit}>
					{renderForm}
				</Form>
			</Stack>
		</>
	);
}
