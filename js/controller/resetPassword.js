app.controller('resetPassword',['$scope','$http','$location','$state',function ($scope,$http,$location,$state){
	
	
	$scope.newPassword = '';
	$scope.confirmPassword = '';
	
	
	//获取当前url地址
	var absurl = $location.absUrl(); 
	$scope.code = absurl.substring(absurl.indexOf('code') + 5);

	
	//确认密码提交
	$scope.confPassword = function (){
		
		if($scope.newPassword==""||$scope.newPassword==null){
            $scope.same = 2;
        }else if($scope.newPassword.length<6){
            $scope.same = 2;
        }else if($scope.confirmPassword==""||$scope.confirmPassword==null){
            $scope.same = 3;
        }else if($scope.confirmPassword.length<6){
            $scope.same = 3;
        }else if($scope.confirmPassword!=$scope.newPassword){
            $scope.same = 1;
        }else {
        	$scope.same = 0;
        	console.log($scope.newPassword)
			console.log($scope.confirmPassword)
			console.log( $scope.code)
			
			$http.post(requireIp+'/uc/login/checkCode',{'code' : $scope.code, 'password' : $scope.confirmPassword}).success(function (res){
				if(res.ret == '200'){
					sessionStorage.clear();
					$state.go('teacher_index.password_success');
				}
			}).error(function (){
				
			});
        }
		
		
		
		
		
		
	}
	
}]);