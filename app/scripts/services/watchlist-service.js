(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name stockDogApp.WatchlistService
   * @description
   * # WatchlistService
   * Service in the stockDogApp.
   */
  angular.module('stockDogApp')
    .service('WatchlistService', function WatchlistService() {

      // Augment Stocks with additional helper functions
      var StockModel = {
        save: function () {
          var watchlist = findById(this.listId);
          watchlist.recalculate();
          saveModel();
        }
      };

      // Augment Watchlists with additional helper functions
      var WatchlistModel = {
        addStock: function (stock) {
          var existingStock = _.find(this.stocks, function (s) {
            return s.company.symbol === stock.company.symbol;
          });
          if (existingStock) {
            existingStock.shares += stock.shares;
          } else {
            _.extend(stock, StockModel);
            this.stocks.push(stock);
          }
          this.recalculate();
          saveModel();
        },
        removeStock: function (stock) {
          _.remove(this.stocks, function (s) {
            return s.company.symbol === stock.company.symbol;
          });
          this.recalculate();
          saveModel();
        },
        recalculate: function () {
          var calcs = _.reduce(this.stocks, function (calcs, stock) {
            calcs.shares += stock.shares;
            calcs.marketValue += stock.marketValue;
            calcs.dayChange += stock.dayChange;
            return calcs;
          }, { shares: 0, marketValue: 0, dayChange: 0 });

          this.shares = calcs.shares;
          this.marketValue = calcs.marketValue;
          this.dayChange = calcs.dayChange;
        }
      };

      // AngularJS will instantiate a singleton by calling "new" on this function
      // 辅助方法：从localStorage 中加载监视列表
      var loadModel = function () {
        var model = {
          watchlists: localStorage['StockDog.watchlists'] ?
            JSON.parse(localStorage['StockDog.watchlists']) : [],
          nextId: localStorage['StockDog.nextId'] ?
            parseInt(localStorage['StockDog.nextId'])
            : 0
        };
        _.each(model.watchlists, function (watchlist) {
          _.extend(watchlist, WatchlistModel);
          _.each(watchlist.stocks, function (stock) {
            _.extend(stock, StockModel);
          });
        });
        return model;
      };

      // 辅助方法：将载监视列表保持到localStorage 中
      var saveModel = function () {
        localStorage['StockDog.watchlists'] = JSON.stringify(Model.watchlists);
        localStorage['StockDog.nextId'] = Model.nextId;
      };

      //  辅助方法：使用lodash找到指定Id的监视列表从localStorage 中
      var findById = function (listId) {
        return _.find(Model.watchlists, function (watchlist) {
          return watchlist.id === parseInt(listId);
        });
      };

      //  返回所以监视列表或者按照指定的ID进行查找
      this.query = function (listId) {
        if (listId) {
          return findById(listId);
        } else {
          return Model.watchlists;
        }
      };
      // 在监视列表模型中保存一个新的监视列表
      this.save = function (watchlist) {
        watchlist.id = Model.nextId++;
        watchlist.stocks = [];
        _.extend(watchlist, WatchlistModel);
        Model.watchlists.push(watchlist);
        saveModel();
      };

      // 从监视列表中移除指定的监视列表
      this.remove = function (watchlist) {
        _.remove(Model.watchlists, function (list) {
          return list.id === watchlist.id;
        });
        saveModel();
      };

      // 为单例服务初始化模型
      var Model = loadModel();
    });
})();

