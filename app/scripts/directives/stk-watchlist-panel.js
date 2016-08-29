(function(){
  'use strict';

  angular.module('stockDogApp')
    // Register directive and inject dependencies[注册指令和依赖注入]
    //$modal依赖注入的是angularStrap
    .directive('stkWatchlistPanel',
    function ($location, $modal, $routeParams, WatchlistService) {
      return {
        templateUrl: 'views/templates/watchlist-panel.html',
        restrict: 'E',
        scope: {},
        link: function ($scope) {
          // Initialize variables【初始化变量】
          $scope.watchlist = {};
          $scope.currentList = $routeParams.listId;
          var addListModal = $modal({
            scope: $scope,
            template: 'views/templates/addlist-modal.html',
            show: false
          });

          // Bind model from service to this scope【绑定服务中的模型到该作用域】
          $scope.watchlists = WatchlistService.query();

          // Display addlist modal【显示addlist model】
          $scope.showModal = function () {
            addListModal.$promise.then(addListModal.show);
          };

          // Create a new list from fields in modal【根据模态框中的字段创建一个新的列表】
          $scope.createList = function () {
            WatchlistService.save($scope.watchlist);
            addListModal.hide();
            $scope.watchlist = {};
          };

          // Delete desired list and redirect to home【删除目标列表并重定向到主页】
          $scope.deleteList = function (list) {
            WatchlistService.remove(list);
            $location.path('/dashboard');
          };

          // Send users to desired watchlist view
          $scope.gotoList = function (listId) {
            $location.path('watchlist/' + listId);
          };

        }
      };
    });
})()
