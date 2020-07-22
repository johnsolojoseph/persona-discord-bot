const calcExpNext = (level) => {
	return Math.round(((0.04 * Math.pow(level, 3)) + (0.08 * Math.pow(level, 2) + 2 * level)));
};

const calcExpYield = (level) => {
	return Math.round(calcExpNext(level) * 0.1 + 6);
};


module.export = {
	calcExpNext,
	calcExpYield,
};