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

TODO: Implement function for damage, given enemy and player objects
*/

module.exports = {
	calculateDmg : ()=>{
		return;
	},
};