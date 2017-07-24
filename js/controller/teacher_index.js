app.controller('teacherCenCtr',['$scope','$rootScope','$location','$http',function($scope,$rootScope,$location,$http){
	/*$scope.toGo = function (state){
		// $rootScope.indexState = false;
        
   	};*/
   	
   	// console.log()
   	//定义菜单权限
   	$scope.menu = {};
   	$scope.user = {};
   	//在sessio中取值
 	$scope.user.id = sessionStorage.getItem('userId') ;
   	$scope.user.userType = sessionStorage.getItem('userType') ;
   	
   	//一进页面通过uid获取菜单权限
   	$http.post(requireIp+"/uc/ucMenu/getMenuByUid",{uid:$scope.user.id}).success(function(data) {
   		$scope.menu = data;
   		console.log($scope.menu);
	});
}]);


//自定义截取图片的过滤器
app.filter('filterMenesrc',function(){
    return function(str){
        return str.substring(str.indexOf('icon-')+5);
    }
})


//自定义指令
/*app.directive('menuPublic', function () {
        return {
            restrict: 'ECAM',
//          controller: function ($scope) {
//              $scope.books = [
//                  {
//                      name: 'php'
//                  },
//                  {
//                      name: 'javascript'
//                  },
//                  {
//                      name: 'java'
//                  }
//              ];
//              $scope.addBook = function(){
//
//              }
//              this.addBook = function(){
//                  // ...
//              }
//          },
//          controllerAs:'bookListController',
            template: '<ul class="zy_perList clearfix"><li class="fl" ui-sref="teacher_index.teacher_personal({tableChange:0})" ng-repeat="menu in menu.data.publicMenuList" ng-click="toGo(0)"><img src="img/{{menu.icon|filterMenesrc}}.png"/>{{menu.name}}</li></ul>',
            replace:true,
            link:function(scope,iEelement,iAttrs,bookListController){
                //iEelement.on('click',bookListController.addBook)
            }
        }

})

//自定义指令
.directive('menuPerson', function () {
        return {
            restrict: 'ECAM',
            template: '<ul class="zy_perList clearfix"><li class="fl" ng-repeat="menu in menu.data.persionMenuList"><img src="img/{{menu.icon|filterMenesrc}}.png"/>{{menu.name}}</li></ul>',
            replace:true,
        }
})*/
