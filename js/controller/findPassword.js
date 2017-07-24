app.controller('findPassword',['$scope','$http','$stateParams','$timeout',function ($scope,$http,$stateParams,$timeout){
	//判断账号类型
	$scope.state = {
		loginStatus:$stateParams.status
	}
	
	//邮箱提交
	
	$scope.tips = {
		'emailTip' : false,
		'prompt' : '',
		'find_email' : '',
		'mail_wrong' : false
	}
	$scope.emailSub = function (){
		if($scope.tips.find_email == '' || $scope.tips.find_email == undefined){
			console.log($scope.tips.find_email)
			$scope.tips.mail_wrong = true;
			$scope.tips.emailTip = false;
		}else{
			$scope.tips.emailTip = true;
			$scope.tips.prompt = '请稍后';
			
			$http.post(requireIp + '/uc/login/sendEmail',{email:$scope.tips.find_email}).success(function (res){
				console.log(res)
				if(res.ret == 200){
	//				alert('邮件已发送，请查收');
					$scope.tips.prompt = '邮件已发送，请查收';
					$timeout(function (){
						$scope.tips.emailTip = false;
					},2000);
					$scope.tips.find_email = '';
				}else if(res.ret == 400){
//					$scope.tips.emailTip = true;
					$scope.tips.prompt = '发送失败';
					$timeout(function (){
						$scope.tips.emailTip = false;
					},1000);
				}else if(res.ret == 401){
//					$scope.tips.emailTip = true;
					$scope.tips.prompt = '此邮箱没有注册';
					$timeout(function (){
						$scope.tips.emailTip = false;
					},1000);
				}
			}).error(function (){
				
			});
		}
	};
	
	
}]);
