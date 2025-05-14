import { useEffect, useState } from "react";

type Props = {
	initialMl: number;
	velocity: number;
	initialPercentageRemainingMl: number;
	initialDate: string | null;
};

export const useTimerRemainingMl = ({ initialMl, velocity, initialPercentageRemainingMl, initialDate }: Props) => {
	const [remainingMl, setRemainingMl] = useState(initialMl);
	const [percentageRemainingMl, setPercentageRemainingMl] = useState(initialPercentageRemainingMl);
	const [daysAndHours, setDaysAndHours] = useState<string>("");

	useEffect(() => {
		if (!initialDate || initialMl === 0 || velocity === 0) return;

		const hoursRemaining = Math.floor((initialMl / velocity / 24) * 24);
		const msRemainingInitial = hoursRemaining * 60 * 60 * 1000;

		const updateValues = () => {
			const INITIAL_DATE = new Date(initialDate);
			const NOW_DATE = new Date();
			const endDate = new Date(INITIAL_DATE.getTime() + msRemainingInitial);
			const diffMs = endDate.getTime() - NOW_DATE.getTime();
			if (diffMs <= 0) {
				setRemainingMl(0);
				setPercentageRemainingMl(0);
				setDaysAndHours("");
				return;
			}
			const remainingHoursNow = diffMs / (1000 * 60 * 60);
			const remainingDays = remainingHoursNow / 24;
			const remainingCartridge = remainingDays * velocity * 24;
			const percetageUpdated = (remainingCartridge / 3.0) * 100;

			setRemainingMl(remainingCartridge);
			setPercentageRemainingMl(percetageUpdated);
			const fullDays = Math.floor(remainingDays);
			const hours = Math.round((remainingDays - fullDays) * 24);
			setDaysAndHours(`${fullDays} días ${hours} horas `);
		};

		updateValues();
		/* const interval = setInterval(updateValues, 1000);

		return () => clearInterval(interval); */
	}, [initialDate, initialMl, velocity]);

	return {
		remainingMl,
		percentageRemainingMl,
		daysAndHours,
	};
};
