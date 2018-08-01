angular.module('app').controller('ActivateCtrl', function ($rootScope, $scope, $cookies, $location, validate, langs, logger, request, $routeParams) {
	if ($routeParams.hash) {
		var post_mas = {
			'hash': $routeParams.hash,
			'lang': $cookies.get('lang')
		};
		request.send('user/activate', post_mas, function(data) {
			if (data.token) {
				$cookies.put('token', data.token);
				langs.putLanguage(data.user.lang);
				logger.logSuccess(langs.get('Your account is active.'));
				$location.path('/dashboard');
			} else {
				$location.path('/');
			}
        });
	}
});