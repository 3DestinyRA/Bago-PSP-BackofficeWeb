import { VerifyEmailView } from "@/components/screens/auth/verify-email-view";
import React from "react";

type Props = {
	searchParams: {
		token: string;
	};
};

function VerifyMailPage({ searchParams }: Readonly<Props>) {
	const token = searchParams?.token;

	return <VerifyEmailView token={token} />;
}

export default VerifyMailPage;
