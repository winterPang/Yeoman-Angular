(function(){
  ;'use strict';

  /**
   * @ngdoc directive
   * @name stockDogApp.directive:stkStockRow
   * @description
   * # stkStockRow
   */
  angular.module('stockDogApp')
    .directive('stkStockRow', function ($timeout, QuoteService) {
      return {
        //用作元素特性，并且需要stkStockTable控制器
        require: '^stkStockTable',
        restrict: 'A',
        scope:{
          stock : "=",
          isLast:"="
        },
        //依赖的控制器在末尾是可以用的
        link: function postLink($scope, $element, $attrs , stockTableCtrl) {
         //为股票创建提示
          $element.tooltip({
            placement:'left',
            title:$scope.stock.company.name
          });
          //将该行添加到TableCtrl中
          stockTableCtrl.addRow($scope);
          //使用QuoteService注册改股票
          QuoteService.register($scope.stock);
          //在$destory上使用QuoteService取消公司注册
          $scope.$on('destroy',function(){
            stockTableCtrl.removeRow($scope);
            QuoteService.deregister($scope.stock);
          })
          //如果是“股票行” 的最后一行，立即抓取报价
          if($scope.isLast){
            $timeout(QuoteService.fetch);
          }
          //监视份额的变化并重新计算字段
          $scope.$watch('stock.shares',function() {
            $scope.stock.marketValue = $scope.stock.shares*
              $scope.stock.lastPrice;
            $scope.stock.dayChange = $scope.stock.shares*
                parseFloat($scope.stock.change);
            $scope.stock.save();
          });

        }
      };
    });
})();
