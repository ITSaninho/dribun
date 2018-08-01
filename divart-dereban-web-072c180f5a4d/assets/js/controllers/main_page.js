angular.module('app').controller('MainPageCtrl', function ($rootScope, $scope, $cookies, $location, validate, langs, logger, request) {
	var localStorage = window.localStorage;
	$scope.chooseType = 'party';
	$scope.friendList = [];
	$scope.timeZone = new Date().getTimezoneOffset() * 60 * (-1);
	$scope.user = {};
	$scope.showTeams = false;
	$scope.token = $cookies.get('token');
	$scope.player = {name: ''};
	$scope.countInTeam = '2';
	
	$scope.signUp = function() {
		var error = 1;
        error *= validate.check($scope.form.email, 'Email');
        error *= validate.check($scope.form.password, 'Password');
        if (error) {
    	    $scope.user.lang = langs.getLanguage();
    	    $scope.user.url = $location.absUrl() + 'activate/{hash}';
            request.send('user/registerActivate', $scope.user, function(data) {
            	if (data.user) {
            		langs.putLanguage(data.user.lang);
               		logger.logSuccess(langs.get('Check your email to activate your account'));
            	}
            });
        }
	};

	$scope.getLeader = function() {
		localStorage.setItem('player', JSON.stringify($scope.friendList));
		$scope.leaders = [];
		$scope.selected = [];

		if (amount == 0 || amount == null) {
			logger.logError('Invalid number');
		} else {
			for (var x in $scope.friendList) {
				if ($scope.friendList[x].checked) {
					$scope.selected.push($scope.friendList[x].name);
				}
			}

			var len = $scope.selected.length;
			for (var i = amount; i > 0; i--){
				$scope.leaders.push($scope.selected.splice(Math.random() * len--, 1)[0]);
			}
			$rootScope.leaders = $scope.leaders;
			$location.path('/results');
		}
	};

	$scope.gererateTeams = function(amount) {
		localStorage.setItem('player', JSON.stringify($scope.friendList));
		$scope.red = [];
		$scope.teams = [];
		
		if ( ! amount) {
			logger.logError('Invalid number');
		} else {
			var numberOfTeams, len; 

			for (var x in $scope.friendList) {
				if ($scope.friendList[x].play) {
					$scope.red.push($scope.friendList[x].name);
				}
			}
			len = $scope.red.length;
			numberOfTeams = Math.floor(len / amount);
			if (numberOfTeams < 2) {
				$scope.red = [];
				logger.logError('Less then two teams');
			} else {
				for (var i = 0; i < numberOfTeams; i++) {
					$scope.teams[i] = [];
					for (var j = 0; j < amount; j++) {
						if ($scope.red.length > 0) {
							$scope.teams[i].push($scope.red.splice(Math.random() * len--,1)[0]);
						}
					}
				}
				$rootScope.results = $scope.teams;
				$location.path('/results');
			}
		}
	};

	$scope.init = function() {
		$scope.getPlayers();
	};

	$scope.maxPlayers = function() {
		return new Array($scope.friendList.length);
	};

	$scope.countInGame = function() {
		var count = 0;
		for (var k in $scope.friendList) {
			if ($scope.friendList[k].play) {
				count++;
			}
		}
		return count;
	};

	$scope.removePlayer = function(index) {
		if (confirm(langs.get('Do you really want to remove this player?'))) {
			$scope.friendList.splice(index, 1);
			localStorage.setItem('player', JSON.stringify($scope.friendList));
		}
	};

	$scope.getPlayers = function() {
		var players = localStorage.getItem('player');
		if (players != null) {
			$scope.friendList = JSON.parse(players);
		}
	};

	$scope.addPlayer = function() {
		var error = 1;
		if ( ! $scope.player.name) {
			logger.logError('Name is required.');
			error = 0;
		}	
			
		if (error) {
			$scope.friendList.unshift({'name': $scope.player.name, 'play': true});
			localStorage.setItem('player', JSON.stringify($scope.friendList));
			$scope.player.name = '';
		}
	};
});