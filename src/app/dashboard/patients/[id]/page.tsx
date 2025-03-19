import React from "react";
import { PatientDetailScreen } from "@/components/screens/patients/patient-detail-screen";

async function PatientDetailPage({ params }: Readonly<{ params: { id: string } }>) {
	return <PatientDetailScreen patientId={params.id} />;
}

export default PatientDetailPage;
