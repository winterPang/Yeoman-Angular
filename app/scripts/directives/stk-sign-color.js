(function(){
  'use strict';

  /**
   * @ngdoc directive
   * @name stockDogApp.directive:stkSignColor
   * @description
   * # stkSignColor
   */
  angular.module('stockDogApp')
    .directive('stkSignColor', function () {
      return {
        restrict: 'A',
        link: function postLink($scope, $element, $attrs) {
         //使用$observe监视表达式的变化
          $attrs.$observe('stkSignColor',function(newVal){
            var newSign = parseFloat(newVal);
            //根据符号设置元素的style.color的值
            if(newSign > 0){
              $element[0].style.color = 'Green';
            }else{
              $element[0].style.color = 'Red';
            }
          })
        }
      };
    })

})();
