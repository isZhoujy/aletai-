app.controller('registerIndexCtrl',['$scope','$rootScope','loginService','$state','$timeout','$stateParams','$http',function($scope,$rootScope,loginService,$state,$timeout,$stateParams,$http) {
   		//输入数据
   		$scope.userId = {};
 		$scope.userId.uid = sessionStorage.getItem('userId') || '';
   		$scope.register_teacher = {
   			realName:'',
   			idNumber:'',
   		}
   		
   		console.log(123)
   		$scope.form_error = {
   			teacher:'请输入您的真实姓名和身份证号',
   			noteTeacher:false,
   			rgeister:$stateParams.tableChange
   		}
//		$scope.form_error.rgeister = 
		
		$scope.changeHeadTab = function (tebState) {
			$scope.form_error.rgeister = tebState;
			$state.go('register_page',{'tableChange':1});
	    }
	   
   		
   		/*if(sessionStorage.getItem('userName')){
   			console.log(888)
   			$scope.form_error.rgeister = 1;
   			$scope.register_teacher.realName = sessionStorage.getItem('userName');			$scope.register_teacher.idNumber = sessionStorage.getItem('userCarId');
//			sessionStorage.clear();
   		}*/
   		
   		
   		//点击下一步
   		$scope.regNext = function (){
			if($scope.register_teacher.realName == '' || $scope.register_teacher.realName == undefined ||　$scope.register_teacher.idNumber == '' || $scope.register_teacher.idNumber == undefined){
				$scope.form_error.noteTeacher = true;
				$scope.form_error.teacher = '请输入您的真实姓名和身份证号';
			}else{
				$http.post(requireIp + '/uc/ucUser/validateIdCard',{idCard : $scope.register_teacher.idNumber}).success(function (data){
   					if(data.ret == '200'){
						$scope.form_error.noteTeacher = false;	
						sessionStorage.setItem('userName',$scope.register_teacher.realName);
			    		sessionStorage.setItem('userCarId',$scope.register_teacher.idNumber);
						$state.go('teacher_index.teacher_personal',{'tableChange':0,'teachId':'undefined'});
   					}else if(data.ret = '400'){
   						$scope.form_error.noteTeacher = true;	
   						$scope.form_error.teacher = data.message;	
   					}
	   			}).error(function (){
	   				
	   			});
			}
   			
   		}
   		
   		
   		

		//点击注册 之前版本
		$scope.registerDataTeacher = function() {
			var regExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			if($scope.register_teacher.realname == '' || $scope.register_teacher.idNumber =='' || !regExp.test($scope.register_teacher.idNumber)) {
				$scope.form_error.teacher = '请输入您的真实姓名和身份证号';
				$scope.form_error.noteTeacher = true;
				return false;
			}else{
				$scope.form_error.noteTeacher = false;
			}
			
			loginService.registerRequire($scope.register_teacher,function(res) {
			if(res.ret == 201) {
		    		$scope.form_error.teacher = res.message;
    				$scope.form_error.noteTeacher = true;
		    	}else if(res.ret == 200) {
		    		sessionStorage.setItem('userId',res.data.id);
		    		sessionStorage.setItem('userType',1);
	    			$state.go('teacher_index.teacher_personal',res.data.id,{reload:true})
		    	}
			},function(e) {
				console.log(e);
			})
		}

}])