import { paths } from "@/routes/paths";
import { STORAGE_KEY } from "./constant";
import jwt from "jsonwebtoken";

// ----------------------------------------------------------------------

export function jwtDecode(token: string) {
	try {
		if (!token) return null;

		const parts = token.split(".");
		if (parts.length < 2) {
			throw new Error("Invalid token!");
		}

		const base64Url = parts[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const decoded = JSON.parse(atob(base64));

		return decoded;
	} catch (error) {
		console.error("Error decoding token:", error);
		throw error;
	}
}

// ----------------------------------------------------------------------

export function isValidToken(accessToken: string) {
	if (!accessToken) {
		return false;
	}

	try {
		const decoded = jwtDecode(accessToken);

		if (!decoded || !("exp" in decoded)) {
			return false;
		}

		const currentTime = Date.now() / 1000;

		return decoded.exp > currentTime;
	} catch (error) {
		console.error("Error during token validation:", error);
		return false;
	}
}

// ----------------------------------------------------------------------

export function tokenExpired(exp: number) {
	const currentTime = Date.now();
	const timeLeft = exp * 1000 - currentTime;

	if (timeLeft > 0) {
		return;
	}

	setTimeout(() => {
		try {
			alert("Token expired!");
			sessionStorage.removeItem(STORAGE_KEY);
			window.location.href = paths.auth.signIn;
		} catch (error) {
			console.error("Error during token expiration:", error);
			throw error;
		}
	}, timeLeft);
}

// ----------------------------------------------------------------------

export async function setSession(accessToken: string | null) {
	try {
		if (accessToken) {
			sessionStorage.setItem(STORAGE_KEY, accessToken);

			const decodedToken = jwtDecode(accessToken);

			if (decodedToken && "exp" in decodedToken) {
				tokenExpired(decodedToken.exp);
			} else {
				throw new Error("Token invalido");
			}
		} else {
			sessionStorage.removeItem(STORAGE_KEY);
		}
	} catch (error) {
		console.error("Error al crear la sesión:", error);
		throw error;
	}
}

// ----------------------------------------------------------------------

export function getDecodedToken(accessToken: string): {
	email: string;
	demo?: boolean;
} | null {
	if (!accessToken) {
		return null;
	}

	try {
		const decoded = jwtDecode(accessToken);

		if (!decoded) {
			return null;
		}

		return {
			email: decoded.email as string,
			demo: decoded.demo === true,
		};
	} catch (error) {
		console.error("Error decodificando el token:", error);
		return null;
	}
}

export const generateToken = (email: string) => {
	try {
		return jwt.sign({ email }, process.env.NEXT_PUBLIC_JWT_SECRET_KEY ?? "", { expiresIn: "7d" });
	} catch (error) {
		console.log("Error generating token:", error);
	}
};
