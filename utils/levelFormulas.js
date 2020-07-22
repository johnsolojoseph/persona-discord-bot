const calcEnemyLevel = (userLevel) => {
	let enemyLevel = Math.round(Math.random() * (userLevel + 5) + userLevel);

	if(enemyLevel > 99) {
		enemyLevel = 99;
	}

	return enemyLevel;
};

module.export = {
	calcEnemyLevel,
};