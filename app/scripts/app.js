'use strict';

/**
 * @ngdoc overview
 * @name yoApp
 * @description
 * # yoApp
 *
 * Main module of the application.
 */
angular
  .module('yoApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/helpers', {
        templateUrl: 'views/helpers.html',
        controller: 'HelpersCtrl'
      })
      .when('/scale', {
        templateUrl: 'views/scale.html',
        controller: 'ScaleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
