import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { BaseLayout } from "@/layouts/base-layout";

const latoFont = Poppins({
	subsets: ["latin"],
	variable: "--font-poppins",
	weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
	title: "Bago Backoffice",
	description: "Programa Calidad de Vida",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${latoFont.variable} antialiased`} suppressHydrationWarning={true}>
				<BaseLayout>{children}</BaseLayout>
			</body>
		</html>
	);
}
