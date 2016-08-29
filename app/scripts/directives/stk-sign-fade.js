(function(){
  'use strict';

  /**
   * @ngdoc directive
   * @name stockDogApp.directive:stkSignFade
   * @description
   * # stkSignFade
   */
  angular.module('stockDogApp')
    .directive('stkSignFade', function ($animate) {
      return {
        /*（字符串）可选参数，指明指令在DOM里面以什么形式被声明；
         取值有：E(元素),A(属性),C(类),M(注释)，其中默认值为A；
         E(元素)：<directiveName></directiveName>
         A(属性)：<div directiveName='expression'></div>
         C(类)：   <div class='directiveName'></div>
         M(注释)：<--directive:directiveName expression-->
         */
        restrict: 'A',
        link: function postLink($scope, $element, $attrs) {
          var oldVal=null;
          //使用$observe 在值改变时候发出通知
          $attrs.$observe('stkSignFade',function(newVal){
            if(oldVal && oldVal == newVal){
              return
            }
            var oldPrice=parseFloat(oldVal);
            var newPrice = parseFloat(newVal);
            oldVal = newVal;

            //t添加适当的方向类，然后移除它
            if(oldPrice && newPrice){
              var direction = newPrice - oldPrice >=0 ? "up" : "down";
              $animate.addClass($element,'change-'+direction,function(){
                $animate.removeClass($element,'change-'+direction)
              });
            }
          })
        }
      };
    });
})();
