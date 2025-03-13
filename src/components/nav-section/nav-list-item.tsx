"use client";

import { NavDataType } from "@/layouts/config-nav-dashboard";
import { ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useActiveLink } from "@/routes/hooks/use-active-link";
import { ResumeIcon } from "@/assets/icons/resume-icon";
import { PatientsIcon } from "@/assets/icons/patients-icon";

type NavListItemProps = NavDataType;

export const NavListItem = ({ title, path, icon }: NavListItemProps) => {
	const isActive = useActiveLink(typeof path === "string" ? path : "", false);

	return (
		<ListItem
			key={title}
			sx={{
				marginY: "15px",
				bgcolor: isActive ? "var(--color-primary)" : "var(--color-white)",
				color: isActive ? "var(--color-white)" : "var(--color-black)",
				borderRadius: "5px",
				padding: "5px 10px",
				width: "100%",
				"&:hover": {
					padding: "5px 10px",
				},
			}}
			component={Link}
			href={path ?? "#"}
			disableGutters
		>
			{icon && (
				<ListItemIcon sx={{ minWidth: 0, marginRight: "12px" }}>
					{icon === "resume" && <ResumeIcon color={isActive ? "var(--color-white)" : "var(--color-gray-dark)"} />}
					{icon === "patients" && <PatientsIcon color={isActive ? "var(--color-white)" : "var(--color-gray-dark)"} />}
				</ListItemIcon>
			)}
			<ListItemText
				primary={
					<Typography variant="navitem" color={isActive ? "var(--color-white)" : "var(--color-gray-dark)"}>
						{title}
					</Typography>
				}
			/>
		</ListItem>
	);
};
