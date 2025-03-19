import { HomeScreen } from "@/components/screens/home/HomeScreen";
import { LayoutContent } from "@/layouts/dashboard/layout-content";
import React from "react";

export default function DahsboardPage() {
	return (
		<LayoutContent breadcrumbText="Hola" title="Este es el resumen semanal">
			<HomeScreen />
		</LayoutContent>
	);
}
