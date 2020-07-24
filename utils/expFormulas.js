module.exports = {

	calcExpNext : (level) => {
		return Math.round(((0.04 * Math.pow(level, 3)) + (0.08 * Math.pow(level, 2) + 2 * level)));
	},
	calcExpYield : (level) => {
		return Math.round(
			(Math.round(((0.04 * Math.pow(level, 3)) +
			(0.08 * Math.pow(level, 2) + 2 * level))) * 0.1)) + 3;
	},
};