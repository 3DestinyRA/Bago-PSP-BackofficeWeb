"use client";

import { useMemo, useEffect, useCallback } from "react";

import { AuthContext } from "../auth-context";
import { AuthState } from "@/auth/types";
import { useSetState } from "@/hooks/use-set-state";

// ----------------------------------------------------------------------

type Props = {
	children: React.ReactNode;
};

export function AuthProvider({ children }: Readonly<Props>) {
	const { state, setState } = useSetState<AuthState>({
		user: null,
		loading: true,
	});

	/**
	 * La sesión vive en una cookie httpOnly: el navegador no puede leerla ni falsificarla.
	 * El servidor la verifica y devuelve al operador con sus pacientes, revalidando
	 * contra Salesforce en cada carga.
	 */
	const checkUserSession = useCallback(async () => {
		try {
			const response = await fetch("/api/auth/me", { cache: "no-store" });

			if (!response.ok) {
				setState({ user: null, loading: false });
				return;
			}

			const { user } = await response.json();
			setState({ user: user ?? null, loading: false });
		} catch (error) {
			console.error("Error al recuperar la sesión:", error);
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
			user: state.user ? { ...state.user } : null,
			checkUserSession,
			loading: status === "loading",
			authenticated: status === "authenticated",
			unauthenticated: status === "unauthenticated",
		}),
		[checkUserSession, state.user, status]
	);

	return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
