"use client";

import { AgeIcon } from "@/assets/icons/patients-items/age-icon";
import { BatteryIcon } from "@/assets/icons/patients-items/battery-icon";
import { DateIcon } from "@/assets/icons/patients-items/date-icon";
import { DeviceIcon } from "@/assets/icons/patients-items/device-icon";
import { DoctorAccesoryIcon } from "@/assets/icons/patients-items/doctor-accesory-icon";
import { IdentificationIcon } from "@/assets/icons/patients-items/identification-icon";
import { RemainingIcon } from "@/assets/icons/patients-items/remaining-icon";
import { SocialMedicalIcon } from "@/assets/icons/patients-items/social-medical-icon";
import { WeightIcon } from "@/assets/icons/patients-items/weight-icon";
import { useAuthContext } from "@/auth/hooks";
import { PatientInfoItem } from "@/components/patient-info-item/patient-info-item";
import { useTimerRemainingMl } from "@/hooks/useTimingRemaining";
import { LayoutContent } from "@/layouts/dashboard/layout-content";
import { IPatient } from "@/types/patient";
import { Box, Grid2, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

type Props = {
	patientId: string;
};

export const PatientDetailScreen = ({ patientId }: Props) => {
	const { user } = useAuthContext();
	const [dataPatient, setDataPatient] = useState<IPatient>();

	const { remainingMl, daysAndHours } = useTimerRemainingMl({
		initialMl: dataPatient?.lastScanner.remainingMl ?? 0,
		velocity: dataPatient?.lastScanner.infusionVelocity ?? 0,
		initialPercentageRemainingMl: 0,
		initialDate: dataPatient?.lastScanner?.date ?? null,
	});

	useEffect(() => {
		if (user && patientId) {
			const patient = user.patients.find((patient) => patient.identificationNumber === patientId);
			setDataPatient(patient);
		} else {
			setDataPatient(undefined);
		}
	}, [patientId, user]);

	if (!dataPatient) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
				<Typography variant="caption3">Paciente no encontrado</Typography>
			</Box>
		);
	}

	return (
		<LayoutContent title={dataPatient ? dataPatient.lastname + " " + dataPatient.name : ""}>
			<Grid2 container columnSpacing={"15px"} rowSpacing={"25px"} justifyContent={"space-evenly"}>
				<Grid2
					size={{
						xs: 12,
						sm: 6,
						md: 4,
					}}
				>
					<PatientInfoItem
						icon={<RemainingIcon />}
						backgroundColor="var(--color-primary)"
						title="Medicación restante"
						value={remainingMl === 0 || !remainingMl ? "0 ml" : `${remainingMl.toFixed(3)} ml - ${daysAndHours}`}
						color="var(--color-white)"
					/>
				</Grid2>
				<Grid2
					size={{
						xs: 12,
						sm: 6,
						md: 4,
					}}
				>
					<PatientInfoItem icon={<AgeIcon />} title="Edad" value={`${dayjs().diff(dataPatient?.dateBirth, "year")}`} />
				</Grid2>
				<Grid2
					size={{
						xs: 12,
						sm: 6,
						md: 4,
					}}
				>
					<PatientInfoItem icon={<IdentificationIcon />} title="DNI" value={`${dataPatient?.identificationNumber}`} />
				</Grid2>
				<Grid2
					size={{
						xs: 12,
						sm: 6,
						md: 4,
					}}
				>
					<PatientInfoItem
						icon={<DateIcon />}
						title="Fecha de Inicio"
						value={`${dayjs(dataPatient?.lastTreatment?.startDate).format("DD/MM")}`}
					/>
				</Grid2>
				<Grid2
					size={{
						xs: 12,
						sm: 6,
						md: 4,
					}}
				>
					<PatientInfoItem
						icon={<DeviceIcon />}
						title="Tipo de Bomba"
						value={dataPatient?.lastTreatment?.deviceType ?? "-"}
					/>
				</Grid2>
				<Grid2
					size={{
						xs: 12,
						sm: 6,
						md: 4,
					}}
				>
					<PatientInfoItem
						icon={<BatteryIcon />}
						title="Presentación"
						value={`${
							dataPatient?.lastTreatment?.product
								? RegExp(/(\d+(\.\d+)?)\s*INY/i).exec(dataPatient?.lastTreatment?.product)?.[1] ?? "-"
								: "-"
						} ml`}
					/>
				</Grid2>
				<Grid2
					size={{
						xs: 12,
						sm: 6,
						md: 4,
					}}
				>
					<PatientInfoItem
						icon={<DoctorAccesoryIcon />}
						title="Médico Tratante"
						value={
							Array.isArray(dataPatient?.lastTreatment?.professionalAssign)
								? dataPatient?.lastTreatment?.professionalAssign.join(", ")
								: dataPatient?.lastTreatment?.professionalAssign ?? "-"
						}
					/>
				</Grid2>
				<Grid2
					size={{
						xs: 12,
						sm: 6,
						md: 4,
					}}
				>
					<PatientInfoItem icon={<SocialMedicalIcon />} title="Obra Social" value={dataPatient?.medicSocial ?? "-"} />
				</Grid2>
				<Grid2
					size={{
						xs: 12,
						sm: 6,
						md: 4,
					}}
				>
					<PatientInfoItem icon={<WeightIcon />} title="Peso" value={`${dataPatient?.weight ?? "-"} kg`} />
				</Grid2>
				<Grid2
					size={{
						xs: 12,
						sm: 6,
						md: 4,
					}}
				>
					<PatientInfoItem icon={<WeightIcon />} title="Peso APP" value={`${dataPatient?.weightApp ?? "-"} kg`} />
				</Grid2>
			</Grid2>
		</LayoutContent>
	);
};
