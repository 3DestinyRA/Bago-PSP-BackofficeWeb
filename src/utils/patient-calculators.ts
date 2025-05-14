export const calculateRemainingCartridge = (velocity: number, presentation: number, weight: number) => {
	console.log("calculateRemainingCartridge", velocity, presentation, weight);
	const CONSTANT_VALUE = 0.00006;
	if (velocity === 0 || presentation === 0 || weight === 0) return { dosis: 0, days: 0, hours: 0 };
	const dosis = (velocity * presentation) / (weight * CONSTANT_VALUE);
	const totalDays = 20 / velocity / 24;
	const days = Math.floor(totalDays);
	const hours = Math.round((totalDays - days) * 24);

	return {
		dosis: dosis.toFixed(4),
		days,
		hours,
		totalDays,
	};
};
