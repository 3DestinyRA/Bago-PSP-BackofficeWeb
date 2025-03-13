import { LayoutContent } from "@/layouts/dashboard/layout-content";
import React from "react";
import { PatientsScreen } from "@/components/screens/patients/patients-screen";

function PatientsPage() {
	return (
		<LayoutContent breadcrumbText="" title="Listado de Pacientes">
			<PatientsScreen />
		</LayoutContent>
	);
}

export default PatientsPage;
