/*
# Damage calc
# DMG = ((5 * sqrt((STR or MAG) / END * BASE) * RNG * TRU) / RKU) + (ATK - TRG)
# STRMAG -> Attackers Strength if physical, Magic otherwise
# END -> Targets Endurance
# RNG -> uniform(0.95, 1.05)
# TRU -> Attackers Taru modifier
# RKU -> Targets Raku modifier
# ATK -> Attackers level
# TRG -> Targets level
# BASE ------v
*/

const calcDmg = (user, enemy, isMagic) => {
	let dmg = 0;

	if (isMagic) {
		dmg = (10 * (Math.sqrt(user.stats[1]) / enemy.stats[2]) + 6);
	}
	else {
		dmg = (10 * (Math.sqrt(user.stats[0]) / enemy.stats[2]) + 6);
	}

	dmg *= Math.random() * (1.5 - 0.95) + 0.95;

	return Math.round(dmg);
};

module.exports = {
	calcDmg,
};