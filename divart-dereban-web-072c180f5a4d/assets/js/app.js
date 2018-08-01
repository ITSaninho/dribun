angular.module('app', ['ngCookies','ngAnimate', 'ngRoute','ngSanitize', 'ui.bootstrap']);

angular.module('app').config(function($routeProvider, $locationProvider) {
	var routes, setRoutes, $cookies;

	$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

  	angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
    	$cookies = _$cookies_;
  	}]);

  	var token = $cookies.get('token');

    $routeProvider
      .when('/', {templateUrl: '/main.html'})
  		.when('/dashboard', {templateUrl: '/dashboard.html'})
      .when('/results', {templateUrl: '/results.html'})
      .when('/activate/:hash', {
        template: '',
        controller: 'ActivateCtrl'
      })
      .otherwise({redirectTo: '/'});
});

/*angular.module('app').run(function($route, $rootScope, $location, $cookies) {
  var registeredViews = ['/dashboard'];
  var publicViews = ['/', '/results', '/activate'];

 $rootScope.$on('$routeChangeStart', function() {
  var url = $location.path();
  var token = $cookies.get('token');
    if (registeredViews.indexOf(url) > -1 && token) {
      $location.path(url);
    } else if (publicViews.indexOf(url) > -1) {
      $location.path(url);
    } else {
      $location.path('/');
    }
  });
});*/

angular.module('app').controller('AppCtrl', function ($scope, langs, $cookies) {
  $scope.results = [];
  $scope.leaders = [];
	$scope.langs = langs;
	$scope.selectedLanguage = langs.getLanguage();
  $scope.resultType = '';

  $scope.logOut = function() {
    $cookies.remove('token');
  };

  $scope.isLoggedIn = function() {
    return $cookies.get('token') ? true : false;
  };

	$scope.setLanguage = function() {
		langs.putLanguage($scope.selectedLanguage);
	};
});

