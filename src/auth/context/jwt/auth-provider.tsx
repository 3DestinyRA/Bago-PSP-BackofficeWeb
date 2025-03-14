"use client";

import { useMemo, useEffect, useCallback } from "react";

import { STORAGE_KEY } from "./constant";
import { AuthContext } from "../auth-context";
import { setSession, isValidToken, getDecodedToken } from "./utils";
import { AuthState } from "@/auth/types";
import { useSetState } from "@/hooks/use-set-state";
import { patientService } from "@/services/patient-service";

// ----------------------------------------------------------------------

type Props = {
	children: React.ReactNode;
};

export function AuthProvider({ children }: Readonly<Props>) {
	const { state, setState } = useSetState<AuthState>({
		user: null,
		loading: true,
	});

	const checkUserSession = useCallback(async () => {
		try {
			const accessToken = sessionStorage.getItem(STORAGE_KEY);

			if (accessToken && isValidToken(accessToken)) {
				setSession(accessToken);

				const decodedTokenResponse = getDecodedToken(accessToken);

				const userData = await patientService.getOperatorByEmail(decodedTokenResponse?.email as string);

				if (!userData || userData?.message !== "") {
					setState({ user: null, loading: false });
					sessionStorage.removeItem(STORAGE_KEY);
				} else {
					setState({
						user: {
							...userData,
						},
						loading: false,
					});
				}
			} else {
				setState({ user: null, loading: false });
			}
		} catch (error) {
			console.error(error);
			setState({ user: null, loading: false });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		checkUserSession();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// ----------------------------------------------------------------------

	const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

	const status = state.loading ? "loading" : checkAuthenticated;

	const memoizedValue = useMemo(
		() => ({
			user: state.user
				? {
						...state.user,
				  }
				: null,
			checkUserSession,
			loading: status === "loading",
			authenticated: status === "authenticated",
			unauthenticated: status === "unauthenticated",
		}),
		[checkUserSession, state.user, status]
	);

	return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
