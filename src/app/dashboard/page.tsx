import { DoctorIcon } from "@/assets/icons/doctor-icon";
import { PatientsIcon } from "@/assets/icons/patients-icon";
import { ScannerIcon } from "@/assets/icons/scanner-icon";
import { DashboardTotal } from "@/components/dashboard-totals/dashboard-total";
import { LayoutContent } from "@/layouts/dashboard/layout-content";
import { Grid2 } from "@mui/material";
import React from "react";

export default function DahsboardPage() {
	return (
		<LayoutContent breadcrumbText="Hola" title="Este es el resumen semanal">
			<Grid2 container columnSpacing={"15px"} justifyContent={"space-between"}>
				<Grid2
					size={{
						xs: 12,
						sm: 6,
						md: 4,
					}}
				>
					<DashboardTotal
						icon={<PatientsIcon color="var(--color-white)" />}
						title="Cantidad total de pacientes"
						value="287"
					/>
				</Grid2>
				<Grid2
					size={{
						xs: 12,
						sm: 6,
						md: 4,
					}}
				>
					<DashboardTotal icon={<DoctorIcon />} title="Cantidad total de medicos" value="94" />
				</Grid2>
				<Grid2
					size={{
						xs: 12,
						sm: 6,
						md: 4,
					}}
				>
					<DashboardTotal icon={<ScannerIcon />} title="Cantidad total de escaneos" value="413" />
				</Grid2>
			</Grid2>
		</LayoutContent>
	);
}
