import React from "react";
import MOCK_DATA from "@/assets/data/MOCK_DATA_PATIENTS.json";
import { LayoutContent } from "@/layouts/dashboard/layout-content";
import { Grid2 } from "@mui/material";
import { PatientInfoItem } from "@/components/patient-info-item/patient-info-item";
import { RemainingIcon } from "@/assets/icons/patients-items/remaining-icon";
import { AgeIcon } from "@/assets/icons/patients-items/age-icon";
import { IdentificationIcon } from "@/assets/icons/patients-items/identification-icon";
import { DateIcon } from "@/assets/icons/patients-items/date-icon";
import dayjs from "dayjs";
import { DeviceIcon } from "@/assets/icons/patients-items/device-icon";
import { BatteryIcon } from "@/assets/icons/patients-items/battery-icon";
import { DoctorAccesoryIcon } from "@/assets/icons/patients-items/doctor-accesory-icon";
import { SocialMedicalIcon } from "@/assets/icons/patients-items/social-medical-icon";
import { WeightIcon } from "@/assets/icons/patients-items/weight-icon";

const dataPatient = [
	{
		id: 1,
		backgroundColor: "var(--color-primary)",
		icon: <RemainingIcon />,
		title: "Medicación restante",
		value: "800 ml - 48 dias y 16 horas",
		color: "var(--color-white)",
	},
	{
		id: 2,
		backgroundColor: undefined,
		icon: <AgeIcon />,
		title: "Edad",
		value: "79",
		color: undefined,
	},
	{
		id: 3,
		backgroundColor: undefined,
		icon: <IdentificationIcon />,
		title: "DNI",
		value: "12345678",
		color: undefined,
	},
	{
		id: 4,
		backgroundColor: undefined,
		icon: <DateIcon />,
		title: "Fecha de Inicio",
		value: dayjs().format("DD/MM"),
		color: undefined,
	},
	{
		id: 5,
		backgroundColor: undefined,
		icon: <DeviceIcon />,
		title: "Tipo de Bomba",
		value: "CADD-MS3",
		color: undefined,
	},
	{
		id: 6,
		backgroundColor: undefined,
		icon: <BatteryIcon />,
		title: "Presentación",
		value: "10 ml",
		color: undefined,
	},
	{
		id: 7,
		backgroundColor: undefined,
		icon: <DoctorAccesoryIcon />,
		title: "Médico Tratante",
		value: "Nombre Apellido",
		color: undefined,
	},
	{
		id: 8,
		backgroundColor: undefined,
		icon: <SocialMedicalIcon />,
		title: "Obra Social",
		value: "OSDE",
		color: undefined,
	},
	{
		id: 9,
		backgroundColor: undefined,
		icon: <WeightIcon />,
		title: "Peso",
		value: "101 kg",
		color: undefined,
	},
	{
		id: 10,
		backgroundColor: undefined,
		icon: <WeightIcon />,
		title: "Peso APP",
		value: "99 kg",
		color: undefined,
	},
];

async function PatientDetailPage({ params }: Readonly<{ params: { id: string } }>) {
	const patient = MOCK_DATA.find((patient) => `${patient.dni}` == `${params.id}`);

	return (
		<LayoutContent title={patient ? patient.apellido + " " + patient.nombre : ""}>
			<Grid2 container columnSpacing={"15px"} rowSpacing={"25px"} justifyContent={"space-evenly"}>
				{dataPatient.map((item) => (
					<Grid2
						key={item.id}
						size={{
							xs: 12,
							sm: 6,
							md: 4,
						}}
					>
						<PatientInfoItem {...item} />
					</Grid2>
				))}
			</Grid2>
		</LayoutContent>
	);
}

export default PatientDetailPage;
