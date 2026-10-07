"use client";

import { useAuthContext } from "@/auth/hooks";
import React from "react";

/**
 * Saluda al operador de la sesión. Ahora que se entra solo con el mail, deja a la
 * vista con qué cuenta se está operando.
 */
export const Greeting = () => {
	const { user } = useAuthContext();
	const name = [user?.name, user?.lastname].filter(Boolean).join(" ").trim();

	return <>{name ? `Hola, ${name}` : "Hola"}</>;
};
