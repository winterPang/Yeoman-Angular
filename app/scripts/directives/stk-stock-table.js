(function(){
  'use strict';

  /**
   * @ngdoc directive
   * @name stockDogApp.directive:stkStockTable
   * @description
   * # stkStockTable
   */
  angular.module('stockDogApp')
    .directive('stkStockTable', function () {
      return {
        templateUrl: 'views/templates/stock-table.html',
        restrict: 'E',
        //隔离作用域
        scope:{
          watchlist:"="
        },
        //创建一个控制器，它将用作该指令的API
        controller:function($scope){
          var rows = [];
          $scope.$watch("showPercent",function(showPercent){
           if(showPercent){
             _.each(rows,function(row){
               row.showPercents = showPercent;
             });
           }
          });
          this.addRow = function(row){
            rows.push(row);
          }
          this.removeRow = function(row){
            _.remove(rows,row);
          }
        },
        //标准的连接函数实现
        link: function postLink($scope, element, attrs) {
          $scope.showPercent = false;
          $scope.removeStock = function(stock){
            $scope.watchlist.removeStock(stock);
          }
        }
      };
    });

})();
