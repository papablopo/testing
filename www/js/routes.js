etaApp

.config([ '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.when("/", {
		templateUrl : "app/views/home.html",
		controller : 'EtaCtrl'
	}).when("/home", {
		templateUrl : "app/views/home.html",
		controller : 'EtaCtrl'
	}).when("/w1", {
		templateUrl : "app/views/welcome1.html",
		controller : 'EtaCtrl'
	}).otherwise({
		redirectTo : '/'
	});
} ])

.run([ '$rootScope', '$location', function($rootScope, $location) {
} ])
