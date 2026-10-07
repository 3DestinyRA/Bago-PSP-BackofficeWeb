import { Greeting } from "@/components/screens/home/greeting";
import { HomeScreen } from "@/components/screens/home/HomeScreen";
import { LayoutContent } from "@/layouts/dashboard/layout-content";
import React from "react";

export default function DahsboardPage() {
	return (
		<LayoutContent breadcrumbText={<Greeting />} title="Este es el resumen semanal">
			<HomeScreen />
		</LayoutContent>
	);
}
