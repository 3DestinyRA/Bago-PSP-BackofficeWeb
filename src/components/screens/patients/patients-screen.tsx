"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { Paper, Typography } from "@mui/material";
import { PatientCell } from "./patient-cell";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/auth/hooks";

export const PatientsScreen = () => {
	const router = useRouter();
	const { user } = useAuthContext();

	const handleClickSelectedPatient = (dni: string) => {
		router.push(`/dashboard/patients/${dni}`);
	};

	const columns: GridColDef[] = [
		{
			field: "id",
			headerName: "DNI",
			flex: 1,
			editable: false,
			valueGetter: (value, row) => row?.identificationNumber,
		},
		{
			field: "nombre",
			headerName: "Nombre",
			flex: 1,
			editable: false,
			renderHeader: () => (
				<Typography variant="caption3" color={"var(--color-primary)"}>
					Nombre
				</Typography>
			),
			renderCell: (params) => <PatientCell value={params.row?.name} />,
		},
		{
			field: "apellido",
			headerName: "Apellido",
			flex: 1,
			editable: false,
			renderHeader: () => (
				<Typography variant="caption3" color={"var(--color-primary)"}>
					Apellido
				</Typography>
			),
			renderCell: (params) => <PatientCell value={params.row?.lastname} />,
		},
		{
			field: "tipoBomba",
			headerName: "Tipo de Bomba",
			flex: 1,
			editable: false,
			renderHeader: () => (
				<Typography variant="caption3" color={"var(--color-primary)"}>
					Tipo de Bomba
				</Typography>
			),
			renderCell: (params) => <PatientCell value={params.row?.lastTreatment?.deviceType} />,
		},
		{
			field: "presentacionMensual",
			headerName: "Presentación",
			flex: 1,
			editable: false,
			renderHeader: () => (
				<Typography variant="caption3" color={"var(--color-primary)"}>
					Presentación
				</Typography>
			),
			renderCell: (params) => <PatientCell value={params.row?.lastTreatment?.product} />,
		},
		{
			field: "fechaInicio",
			headerName: "Fecha de Inicio",
			flex: 1,
			editable: false,
			renderHeader: () => (
				<Typography variant="caption3" color={"var(--color-primary)"}>
					Fecha de Inicio
				</Typography>
			),
			renderCell: (params) => (
				<PatientCell
					value={
						params.row?.lastTreatment?.startDate ? dayjs(params.row?.lastTreatment?.startDate).format("DD/MM") : ""
					}
				/>
			),
		},
		{
			field: "medicoTratante",
			headerName: "Médico",
			flex: 1,
			editable: false,
			renderHeader: () => (
				<Typography variant="caption3" color={"var(--color-primary)"}>
					Médico
				</Typography>
			),
			renderCell: (params) => <PatientCell value={params.row?.lastTreatment?.professionalAssign} />,
		},
		{
			field: "operadorDesignado",
			headerName: "Operador",
			flex: 1,
			editable: false,
			renderHeader: () => (
				<Typography variant="caption3" color={"var(--color-primary)"}>
					Operador
				</Typography>
			),
			renderCell: (params) => <PatientCell value={params.row?.operator} />,
		},
	];

	return (
		<Paper sx={{ width: "90%", overflow: "hidden", borderRadius: "20px" }}>
			<DataGrid
				rows={user?.patients ?? []}
				getRowId={(row) => row.identificationNumber}
				columns={columns}
				pageSizeOptions={[]}
				disableMultipleRowSelection
				checkboxSelection={false}
				disableRowSelectionOnClick
				initialState={{
					columns: {
						columnVisibilityModel: {
							id: false,
						},
					},
				}}
				sx={{
					border: "none",
					height: "80vh",
					paddingY: "20px",
					paddingX: "10px",
					"& .MuiDataGrid-columnSeparator": {
						display: "none",
					},
				}}
				getRowHeight={() => "auto"}
				hideFooter
				disableColumnResize
				disableVirtualization
				onCellClick={(params) => {
					handleClickSelectedPatient(params.row.identificationNumber);
				}}
			/>
		</Paper>
	);
};
