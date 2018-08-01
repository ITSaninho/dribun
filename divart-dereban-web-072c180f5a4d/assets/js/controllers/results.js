angular.module('app').controller('ResultsCtrl', function ($rootScope, $scope, $cookies, $location, langs, logger) {
	$scope.teams = $rootScope.results;
	$scope.leaders = $rootScope.leaders;
	
});