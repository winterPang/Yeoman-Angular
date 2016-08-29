

(function(W){
  'use strict';

  /**
   * @ngdoc overview
   * @name stockDogApp
   * @description
   * # stockDogApp
   *
   * Main module of the application.
   */
  var stockDogApp = angular.module('stockDogApp', ['ngAnimate','ngCookies','ngResource',
    'ngRoute','ngSanitize','ngTouch','mgcrea.ngStrap']);
  stockDogApp.config(function($routeProvider){
    $routeProvider.when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardCtrl'
    }).when('/watchlist/:listId', {
      templateUrl: 'views/watchlist.html',
      controller: 'WatchlistCtrl'
    })
  })
})(window);

