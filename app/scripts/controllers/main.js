(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name stockDogApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the stockDogApp
   */
  angular.module('stockDogApp')
    .controller('MainCtrl', function ($scope,$location,WatchlistService) {
      //w为动态导航设置数据【从localstorage获取数据】
      $scope.watchlists = WatchlistService.query();
    //  将location.path()函数用作$watch表达式
      $scope.$watch(function(){
        return $location.path();
      },function(path){
        if(_.includes(path,'watchlist')){
          $scope.activeView = 'watchlist';
        }else{
          $scope.activeView = 'dashboard';
        }
      })
    });
})();

