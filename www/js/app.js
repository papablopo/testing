//angular.module("EtaApp", [ "ngRoute" ]);

var etaApp = angular.module("EtaApp", ["ngRoute", 'ngAnimate']);

angular.module('scrollDemo', ['ui.router', 'ngAnimate', 'mn']);

etaApp.config(['$locationProvider', function ($locationProvider) {
	$locationProvider.hashPrefix('');
}]);

etaApp.config(function ($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "app/views/welcome1.html",
		controller: 'ProductsCtrl'
	}).when("/home", {
		templateUrl: "app/views/home.html",
		controller: 'ProductsCtrl'
	}).when("/welcome1", {
		templateUrl: "app/views/welcome1.html",
	}).when("/welcome2", {
		templateUrl: "app/views/welcome2.html",
	}).when("/welcome3", {
		templateUrl: "app/views/welcome3.html",
	}).when("/login", {
		templateUrl: "app/views/login.html",
		controller: 'UserCtrl'
	}).when("/register1", {
		templateUrl: "app/views/register1.html",
		controller: 'UserCtrl'
	}).when("/register2", {
		templateUrl: "app/views/register2.html",
		controller: 'UserCtrl'
	}).when("/register2", {
		templateUrl: "app/views/register2.html",
		controller: 'UserCtrl'
	}).when("/register3", {
		templateUrl: "app/views/register3.html",
		controller: 'UserCtrl'
	}).when("/home", {
		templateUrl: "app/views/home.html",
		controller: 'ProductsCtrl'
	}).when("/map", {
		templateUrl: "app/views/map.html",
		controller: 'ProductsCtrl'
	}).when("/account", {
		templateUrl: "app/views/account.html",
		controller: 'UserCtrl'
	}).when("/history", {
		templateUrl: "app/views/history.html",
		controller: 'ProductsCtrl'
	}).when("/historyDetail", {
		templateUrl: "app/views/historyDetail.html",
		controller: 'UserCtrl'
	}).when("/coupons", {
		templateUrl: "app/views/coupons.html",
		controller: 'UserCtrl'
	}).when("/pin", {
		templateUrl: "app/views/pin.html",
		controller: 'ProductsCtrl'
	}).when("/passwordRecover", {
		templateUrl: "app/views/passwordRecover.html",
		controller: 'UserCtrl'
	}).when("/category/:catId/:catName", {
		templateUrl: "app/views/category.html",
		controller: 'ProductsCtrl'
	}).when("/aboutEta", {
		templateUrl: "app/views/aboutEta.html",
		controller: 'ProductsCtrl'
	}).when("/aboutApp", {
		templateUrl: "app/views/aboutApp.html",
		controller: 'ProductsCtrl'
	}).when("/help", {
		templateUrl: "app/views/help.html",
		controller: 'ProductsCtrl'
	}).when("/privacy", {
		templateUrl: "app/views/privacy.html",
		controller: 'ProductsCtrl'
	}).when("/accountStatus", {
		templateUrl: "app/views/accountStatus.html",
		controller: 'ProductsCtrl'
	}).when("/pushContent", {
		templateUrl: "app/views/pushContent.html",
		controller: 'ProductsCtrl'
	}).when("/etacash", {
		templateUrl: "app/views/etacash.html",
		controller: 'ProductsCtrl'
	}).when("/planeta1", {
		templateUrl: "app/views/planetaStep1.html",
		controller: 'UserCtrl'
	}).when("/planeta2", {
		templateUrl: "app/views/planetaStep2.html",
		controller: 'UserCtrl'
	}).when("/search/:keyword", {
		templateUrl: "app/views/search.html",
		controller: 'ProductsCtrl'
	}).when("/modifyPassword", {
		templateUrl: "app/views/modifyPassword.html",
		controller: 'UserCtrl'
	}).otherwise({
		redirectTo: '/'
	});
});

etaApp.controller('EtaCtrl', function ($scope) {
	// try {
	// window.analytics.startTrackerWithId('UA-68577153-2');
	// console.log('ga init');
	// } catch (e) {
	// console.log(e);
	// }

	$scope.name = 'name1';
});

etaApp.controller('EtaCtrl1', function ($scope) {
	$scope.name = 'name1';
});

etaApp.controller('EtaCtrl2', function ($scope) {
	$scope.name = 'name2';
});

etaApp.controller('EtaCtrl3', function ($scope) {
	$scope.name = 'name3';
});