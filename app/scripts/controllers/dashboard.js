(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name stockDogApp.controller:DashboardCtrl
   * @description
   * # DashboardCtrl
   * Controller of the stockDogApp
   */
  angular.module('stockDogApp')
    .controller('DashboardCtrl', function ($scope,WatchlistService,QuoteService) {
      //初始化
      var unregisterHandlers = [];
      $scope.watchlist = WatchlistService.query();
      $scope.cssStyle = 'height:300px';
      var formatters = {
        number: [
          {
            columnNum: 1,
            prefix: '$'
          }
        ]
      };

      //辅助函数：更新图标对象
      var updateCharts = function(){
        //双层圆环
        var donutChart = {
          type:"PieChart",
          display:true,
          data:[['Watchlist','Market Value']],
          options:{
            title:"Market Value by Watchlist",
            legend:"none",
            pieHole:0.4
          },
          formatters:formatters
        };
        //柱状图
        var columnChart = {
          type:'ColumnChart',
          displayed:true,
          data:[['Watchlist','Change',{role:'style'}]],
          options:{
            title:'Day Change by Watchlist',
            legend:'none',
            animation:{
              duration:1500,
              easing:'linear'
            }
          },
          formatters:formatters
        }

        //将数据推入图表中
        _.each($scope.watchlists,function(watchlist,key){
          donutChart.data.push([watchlist.name,watchlist.marketValue]);
          columnChart.data.push([watchlist.name,watchlist.dayChange,
            watchlist.dayChange < 0 ? 'Red' : 'Green'
          ]);
         /* donutChart.data.push(["ss"+key,key]);
          columnChart.data.push(["ssd"+key,key,key%2 ==0 ? "red":"green"])*/
          $scope.donutChart = donutChart;
          $scope.columnChart = columnChart;
        })
      }

        //重置控制器状态的辅助函数
        var reset = function (){
          //在注册之前清除QuoteService
          QuoteService.clear();
          _.each($scope.watchlists,function(watchlist){
            _.each(watchlist.stocks,function(stock){
              QuoteService.register(stock);
            })
          });
          //在创建新的$watch监听器之前，注销现有的$watch监听器
          _.each(unregisterHandlers,function(unregister){
            unregister();
          });
          _.each($scope.watchlists,function(watchlist){
            var unregister  = $scope.$watch(function() {
                return watchlist.marketValue;
            },function(){
              recalculate();
            });
            unregisterHandlers.push(unregister);
          });
        };

        //计算新的total MarketValue 和 DayChange
        var recalculate = function(){
          $scope.marketValue = 0;
          $scope.dayChange = 0;
          _.each($scope.watchlists,function(watchlist){
            $scope.marketValue += watchlist.marketValue?watchlist.marketValue:0;
            $scope.dayChange += watchlist.dayChange ?watchlist.dayChange:0;
          });
          updateCharts();
        }


      //监视列表的变化
      $scope.$watch('watchlists.length',function(){
        reset();
      });
    });
})();
