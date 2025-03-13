"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import MOCK_DATA from "@/assets/data/MOCK_DATA_PATIENTS.json";
import { Paper, Typography } from "@mui/material";
import { PatientCell } from "./patient-cell";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const columns: GridColDef<(typeof MOCK_DATA)[number]>[] = [
	{ field: "id", headerName: "DNI", flex: 1, editable: false, valueGetter: (value, row) => row.dni },
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
		renderCell: (params) => <PatientCell value={params.row.nombre} />,
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
		renderCell: (params) => <PatientCell value={params.row.apellido} />,
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
		renderCell: (params) => <PatientCell value={params.row.tipoBomba} />,
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
		renderCell: (params) => <PatientCell value={params.row.presentacionMensual} />,
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
		renderCell: (params) => <PatientCell value={dayjs(params.row.fechaInicio).format("DD/MM")} />,
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
		renderCell: (params) => <PatientCell value={params.row.medicoTratante} />,
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
		renderCell: (params) => <PatientCell value={params.row.operadorDesignado} />,
	},
];

export const PatientsScreen = () => {
	const router = useRouter();

	const handleClickSelectedPatient = (dni: string) => {
		router.push(`/dashboard/patients/${dni}`);
	};

	return (
		<Paper sx={{ width: "90%", overflow: "hidden", borderRadius: "20px" }}>
			<DataGrid
				rows={MOCK_DATA}
				getRowId={(row) => row.dni}
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
					handleClickSelectedPatient(params.row.dni);
				}}
			/>
		</Paper>
	);
};
