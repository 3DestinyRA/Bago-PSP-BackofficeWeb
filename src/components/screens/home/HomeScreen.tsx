"use client";

import { DoctorIcon } from "@/assets/icons/doctor-icon";
import { PatientsIcon } from "@/assets/icons/patients-icon";
import { ScannerIcon } from "@/assets/icons/scanner-icon";
import { useAuthContext } from "@/auth/hooks";
import { DashboardTotal } from "@/components/dashboard-totals/dashboard-total";
import { IPatient } from "@/types/patient";
import { Grid2 } from "@mui/material";
import React, { useEffect } from "react";

export const HomeScreen = () => {
	const { user } = useAuthContext();
	const [totals, setTotals] = React.useState({
		patients: 0,
		doctors: 0,
		scans: 0,
	});

	const getTotalDoctors = (patients: IPatient[]) => {
		const professionals = new Set();

		patients?.forEach((patient) => {
			const flatArrayTreatments = patient?.treatments?.flat();
			flatArrayTreatments.forEach((treatment) => {
				const professional = treatment?.professionalAssign;
				if (professional) {
					professionals.add(professional);
				}
			});
		});

		return professionals.size;
	};

	useEffect(() => {
		const totalPatients = user?.patients?.length ?? 0;
		const totalDoctors = getTotalDoctors(user?.patients ?? []);
		const totalScans = user?.patients?.reduce((total, patient) => total + patient.scanners.length, 0) ?? 0;

		setTotals({
			patients: totalPatients,
			doctors: totalDoctors,
			scans: totalScans,
		});
	}, [user]);

	return (
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
					value={`${totals.patients}`}
				/>
			</Grid2>
			<Grid2
				size={{
					xs: 12,
					sm: 6,
					md: 4,
				}}
			>
				<DashboardTotal icon={<DoctorIcon />} title="Cantidad total de medicos" value={`${totals.doctors}`} />
			</Grid2>
			<Grid2
				size={{
					xs: 12,
					sm: 6,
					md: 4,
				}}
			>
				<DashboardTotal icon={<ScannerIcon />} title="Cantidad total de escaneos" value={`${totals.scans}`} />
			</Grid2>
		</Grid2>
	);
};
