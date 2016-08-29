(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name stockDogApp.controller:WatchlistCtrl
   * @description
   * # WatchlistCtrl
   * Controller of the stockDogApp
   */
  angular.module('stockDogApp')
    .controller('WatchlistCtrl', function ($scope,$routeParams,$modal,WatchlistService,CompanyService) {
      //初始化
      $scope.companies = CompanyService.query();
      $scope.names = ['ddd','test','ss'];
      $scope.watchlist = WatchlistService.query($routeParams.listId);
      $scope.stocks = $scope.watchlist.stocks;
      $scope.newStock = {};
      //定义使用modal UI 组件
      var addStockModal = $modal({
        scope:$scope,
        template:'views/templates/addstock-modal.html',
        show:false
      });

      //$scope将showStockModal公开给视图
      $scope.showStockModal =function(){
        addStockModal.$promise.then(addStockModal.show);
      }
      //调用WatchListModal addStock()函数并且隐藏模态框
      $scope.addStock = function(){
        console.log($scope.newStock.company);
        $scope.watchlist.addStock({
          listId:$routeParams.listId,
          company:$scope.newStock.company,
          shares:$scope.newStock.shares
        });
        addStockModal.hide();
        $scope.newStock= {};
      }

    });

})();

