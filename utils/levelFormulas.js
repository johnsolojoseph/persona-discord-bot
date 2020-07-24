module.exports = {
	calcEnemyLevel : (userLevel) => {
		if(userLevel > 99) {
			userLevel = 99;
		}

		let enemyLevel = Math.round((Math.random() * 5) + userLevel);

		if(enemyLevel > 99) {
			enemyLevel = 99;
		}

		return enemyLevel;
	},
};

