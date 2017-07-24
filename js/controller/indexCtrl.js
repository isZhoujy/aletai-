//首页的控制器
app.controller('indexCtrl',['$scope','loginService','$state','$http',function($scope,loginService,$state,$http) {
//	$scope.dlzt = false;
	if(sessionStorage.getItem('userId')) {
		var userObj = {
			uid:sessionStorage.getItem('userId'),
			userType:sessionStorage.getItem('userType')
		}
		var userState = JSON.parse(sessionStorage.getItem('userObj')) || 0;
		if(userState==0){
			return false;
		}
		$scope.dlzt = true;
		loginService.getUserIdMes(userObj,function(res) {
			if(res.ret==200){
				if(userObj.userType == 1){
					if(!res.data.userInfo.state){
						return false;
					};
					$scope.dlzt_name = res.data.userInfo.realname;
				}else if(userObj.userType == 2){
					if(!res.data.stuInfo.state){
						return false;
					};
					$scope.dlzt_name = res.data.stuInfo.realname;
				}else if(userObj.userType == 3){
					if(!res.data.parInfo.state){
						return false;
					};
					$scope.dlzt_name = res.data.parInfo.realname;
				}
			}
		},function(e) {
			console.log(e)	
		})
	}else{
		$scope.dlzt = false;
	}
	//点击退出按钮
	$scope.login_out = function(){
		$scope.deletStatus =true;
	}
	$scope.gbtc = function(){
		$scope.deletStatus = false;
	}
	$scope.suredel = function(){
		loginService.userLoginOut(function(res) {
			sessionStorage.clear(); 
			$scope.dlzt = false;
			$state.go('login_index.sub_index',null,{reload:true})
		},function(e) {
			alert(e)
		})
	}
	
	//测试跨域
	/*$http.get('http://116.255.134.2:8082/svc/user?ticket=ST-13-4aPPLqQdnjpJOhmtGaLV-cwp_jetsen').success(function(res){
    		console.log(res);
	});*/
	
	//其它接口退出
	/*$scope.$on('test',function(){
		$scope.dlzt = false;
	});*/
}])
