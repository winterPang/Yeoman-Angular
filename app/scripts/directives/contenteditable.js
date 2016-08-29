(function(){
  'use strict';

  /**
   * @ngdoc directive
   * @name stockDogApp.directive:contenteditable
   * @description
   * # contenteditable
   */
  var MUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;

  angular.module('stockDogApp')
    .directive('contenteditable', function ($sce) {//唯一依赖注入Strict Contextual Escaping
      return {
        template: '<div></div>',
        restrict: 'A',
        require:'ngModel',//获得NgModalController
        link: function postLink($scope, $element, $attrs,ngModalCtrl) {
          //如果没有ng-model,则什么也不做
          if(!ngModalCtrl){
            return
          }
          //指代如何更新UI
          ngModalCtrl.$render = function(){
            $element.html($sce.getTrustedHtml(ngModalCtrl.$viewValue)||'');
          }

          //读取Html值，然后将数据写入模型或者重置视图
          var read = function() {
            var value = $element.html();

            if($attrs.type === 'number'&& !MUMBER_REGEXP.test(value)){
              ngModalCtrl.$render();
            }else{
              ngModalCtrl.$setViewValue(value);
            }

          }

          //添加基于解析器的自定义输入类型（只是支持'number'）
          if($attrs.type === 'number'){
            ngModalCtrl.$parsers.push(function(value){
              return parseFloat(value)
            })
          }

          //监听改变时间，启用绑定,监听blur keyup change事件
          $element.on('blur keyup change',function(){
            //每次修改调用read函数
            $scope.$apply(read)
          });

        }
      };
    });

})();
