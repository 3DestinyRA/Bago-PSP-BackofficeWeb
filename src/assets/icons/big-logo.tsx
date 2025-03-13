import { motion } from "framer-motion";

export const LogoAnimated = () => {
	return (
		<svg width="95" height="115" viewBox="0 0 95 115" fill="none" xmlns="http://www.w3.org/2000/svg">
			<motion.path
				d="M37.7825 25.7102C37.7825 32.5783 32.2894 38.1449 25.5147 38.1449C18.7401 38.1449 13.2469 32.5783 13.2469 25.7102C13.2469 18.8422 18.7401 13.2689 25.5147 13.2689C32.2894 13.2689 37.7825 18.8422 37.7825 25.7102Z"
				initial={{ fill: "#33A5AA", opacity: 0 }}
				animate={{ fill: "#33A5AA", opacity: 1 }}
				transition={{
					duration: 1,
					ease: "easeInOut",
					repeat: Infinity,
					repeatType: "reverse",
				}}
			/>
			<motion.path
				d="M78.6773 16.1724C78.6773 25.1029 71.5356 32.3447 62.7252 32.3447C53.9148 32.3447 46.7798 25.1029 46.7798 16.1724C46.7798 7.24185 53.9149 -7.62939e-06 62.7185 -7.62939e-06C71.5222 -7.62939e-06 78.6706 7.24185 78.6706 16.1724"
				initial={{ fill: "#DE427D", opacity: 0 }}
				animate={{ fill: "#DE427D", opacity: 1 }}
				transition={{
					duration: 1,
					ease: "easeInOut",
					repeat: Infinity,
					repeatType: "reverse",
				}}
			/>
			<motion.path
				d="M23.2387 46.2144C23.2387 46.2144 0.732239 43.9651 0.732239 70.9034C0.732239 97.8418 39.1107 110.937 66.79 114.682C66.79 114.682 51.2917 48.457 23.2454 46.2077"
				initial={{ fill: "#33A5AA", opacity: 0 }}
				animate={{ fill: "#33A5AA", opacity: 1 }}
				transition={{
					duration: 1,
					ease: "easeInOut",
					repeat: Infinity,
					repeatType: "reverse",
				}}
			/>
			<motion.path
				d="M66.79 114.682C66.79 114.682 61.6239 107.567 67.898 100.839C74.172 94.1041 96.3114 79.5069 94.4692 61.9262C92.6271 44.3455 77.863 43.5913 72.6969 43.5913C67.5309 43.5913 43.1755 45.8339 43.1755 79.5069C43.1755 113.18 66.7967 114.682 66.7967 114.682"
				initial={{ fill: "#DE427D", opacity: 0 }}
				animate={{ fill: "#DE427D", opacity: 1 }}
				transition={{
					duration: 1,
					ease: "easeInOut",
					repeat: Infinity,
					repeatType: "reverse",
				}}
			/>
			<motion.path
				d="M64.8344 107.38C61.8108 96.8807 55.3232 77.2109 45.7052 62.9941C44.1367 67.426 43.1689 72.839 43.1689 79.5069C43.1689 108.087 60.1756 113.487 65.3216 114.468C65.8089 114.541 66.3028 114.615 66.7833 114.682C66.7833 114.682 64.4873 111.498 64.8344 107.38Z"
				initial={{ fill: "#BB326D", opacity: 0 }}
				animate={{ fill: "#BB326D", opacity: 1 }}
				transition={{
					duration: 1,
					ease: "easeInOut",
					repeat: Infinity,
					repeatType: "reverse",
				}}
			/>
		</svg>
	);
};
