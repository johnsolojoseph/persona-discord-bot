// [[st,mg,en,lck,ag], hp, mp]
const modStats = (stats, hp, mp, level) => {
	const newStats = [0, 0, 0];

	for(let i = 0; i < stats.length; i++) {
		stats[i] *= level;
	}

	newStats[0] = stats;
	newStats[1] = hp + level;
	newStats[2] = mp + level;

	return newStats;
};

module.exports = {
	modStats,
};