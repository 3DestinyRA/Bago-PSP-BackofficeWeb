"use client";
import { TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Props = TextFieldProps & {
	name: string;
};

export const CtrTextField = ({ name, helperText, type, ...other }: Props) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<TextField
					{...field}
					fullWidth
					type={type}
					value={type === "number" && field.value === 0 ? "" : field.value}
					onChange={(event) => {
						if (type === "number") {
							const newValue = +event.target.value;
							if (!isNaN(newValue) && Number(newValue) >= 0) {
								field.onChange(Number(newValue));
							}
						} else {
							field.onChange(event.target.value);
						}
					}}
					error={!!error}
					helperText={error?.message ?? helperText}
					{...other}
					sx={{
						"& .MuiOutlinedInput-root": {
							borderRadius: "10px",
							border: "1px solid var(--color-primary)",
							backgroundColor: "var(--color-white)",
						},

						"& .MuiOutlinedInput-input": {
							height: "100%",
							maxHeight: other.multiline ? "unset" : "44px",
							padding: other.multiline ? "2px 4px 4px 4px" : "13px 24px",
							fontFamily: "var(--font-poppins)",
							fontWeight: 600,
							fontSize: "12px",
							"::placeholder": {
								color: "var(--color-gray-light)",
								fontFamily: "var(--font-poppins)",
								fontWeight: 400,
								fontSize: "12px",
							},
						},
						"& .MuiOutlinedInput-notchedOutline": {
							border: "none",
						},
						"& .MuiFormHelperText-root": {
							fontFamily: "var(--font-poppins)",
							fontSize: "12px",
							fontWeight: 400,
							color: "red",
							marginLeft: 0,
							marginRight: 0,
						},
					}}
				/>
			)}
		/>
	);
};
