 app.controller('loginIndexCtrl',['$scope','$rootScope','loginService','$state','$timeout','$http','$location',function($scope,$rootScope,loginService,$state,$timeout,$http,$location) {
 	
 	//判断用户是否已从其它接口登出
 	/*var absurl = $location.absUrl(); 
	if(absurl.indexOf('msg=out') != -1){
		sessionStorage.clear();
		$scope.$emit('test');
//		$state.go('login_index.sub_index');
	}*/
 	
   	//输入数据
   		$scope.userId = {};
 		$scope.userId.uid = sessionStorage.getItem('userId') || '';
   		$scope.data_teach = {
   			username:'',
   			password:'',
   			userType:1
   		}
   		$scope.data_student = {
   			username:'',
   			password:'',
   			userType:2
   		}
   		$scope.data_parents = {
   			username:'',
   			password:'',
   			userType:3
   		}
   		$scope.signDate = new Date;//获取客户端日期
   		switch($scope.signDate.getDay()) {
   			case 0:
   				$scope.sign_week = '星期日';
   			break;
   			case 1:
   				$scope.sign_week = '星期一';
   			break;
   			case 2:
   				$scope.sign_week = '星期二';
   			break;
   			case 3:
   				$scope.sign_week = '星期三';
   			break;
   			case 4:
   				$scope.sign_week = '星期四';
   			break;
   			case 5:
   				$scope.sign_week = '星期五';
   			break;
   			case 6:
   				$scope.sign_week = '星期六';
   			break;
   		}
   		$scope.state = {
   			child_mes:0,//点击切换家长孩子信息
   			signin_end:false,//判断登陆状态
   			loginStatus:0,//login选项卡判断
			userFace : ''
   		}
   		$scope.jumpPage = function(){
   			$state.go('teacher_index.find_password',{'status':$scope.state.loginStatus})
   		}
   		
   		$scope.form_error = {
   			teach:'请输入符合规则的账号和密码',
   			student:'请输入符合规则的账号和密码',
   			parents:'请输入符合规则的账号和密码',
   			noteTeach:false,
   			noteStudent:false,
   			noteParents:false
   		}
		$scope.userTtile = '';//用户名
		//菜单权限
		$scope.menuLimit = {
			publicMenuMain : [],
			publicMenuSub:[]
		}
		//模拟家长登陆后 自家孩子信息
		$scope.sign_parents= {
			list:[],
			listMes:[]
		}
		
		//模拟登陆后用户菜单信息
		$scope.menuList = {
			"manage":{
				main:[{name:'个人信息',className:"iconfont icon-gerenxinxi"},{name:'账号设置',className:"iconfont icon-zhanghaoshezhi"}],
				sub:[{name:'学校管理',className:"iconfont icon-xuexiaoguanli"},{name:'班级管理',className:"iconfont icon-banjiguanli"},{name:'任课管理',className:"iconfont icon-renkeguanli"},{name:'教师管理',className:"iconfont icon-jiaoshiguanli"},{name:'学生管理',className:"iconfont icon-xueshengguanli"},{name:'家长管理',className:"iconfont icon-jiazhangguanli"}]
			},
			"teach":[{name:'个人信息'},{name:'账号设置'}],
			"mainTeach":{
				main:[{name:'个人信息'},{name:'账号设置'}],
				sub:[{name:'学生管理'},{name:'家长管理'}]
			},
			"student":[{name:'个人信息'},{name:'账号设置'}],
			"parents":[{name:'个人信息'},{name:'账号设置'},{name:'子女资料'}]
		}
		initLogin();
		//点击切换
		$scope.changeState = function(status) {
		    $scope.state.loginStatus = status;
		}
		//点击登陆
		$scope.submitDataStudent = function(){
			var regExp = /^[G|L][1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
			if(!regExp.test($scope.data_student.username)||$scope.data_student.username == ''||$scope.data_student.password =='') {
				$scope.form_error_student = '请输入符合规则的账号和密码';
				$scope.form_error.noteStudent = true;
				return false;
			}else{
				$scope.form_error.noteStudent = false;
			}
			 loginService.loginRequire($scope.data_student,function(res) {
				if(res.ret == 400) {
		    		$scope.form_error.teach = res.message;
    				$scope.form_error.noteStudent = true;
		    	}else if(res.ret == 200) {
		    		// $scope.userTtile = res.data.realname;
		    		sessionStorage.setItem('userId',res.data.id);
		    		sessionStorage.setItem('userType',res.data.userType);
					var userStatus = {userStatus:1};
					userStatus = JSON.stringify(userStatus);
					sessionStorage.setItem('userObj',userStatus);
					$state.go('login_index.sub_index',null,{reload:true})
//					window.location.href=requireIp+'/UcUser/createSession?uid='+res.data.id;
		    	}
			},function(e) {
				console.log(e)
			})
		}
		$scope.submitDataParents = function() {
			var regExp = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/;
			if(!regExp.test($scope.data_parents.username)||$scope.data_parents.username == ''||$scope.data_parents.password =='') {
				$scope.form_error.parents = '请输入符合规则的账号和密码';
				$scope.form_error.noteParents = true;
				return false;
			}else{
				$scope.form_error.noteParents = false;
			}
		   loginService.loginRequire($scope.data_parents,function(res) {
				if(res.ret == 400) {
		    		$scope.form_error.parents = res.message;
    				$scope.form_error.noteParents = true;
		    	}else if(res.ret == 200) {
		    		// $scope.userTtile = res.data.realname;
					sessionStorage.setItem('userId',res.data.id);
		    		sessionStorage.setItem('userType',res.data.userType);
					var userStatus = {userStatus:1};
					userStatus = JSON.stringify(userStatus);
					sessionStorage.setItem('userObj',userStatus);
					$state.go('login_index.sub_index',null,{reload:true});
//					window.location.href=requireIp+'/UcUser/createSession?uid='+res.data.id;
		    		// loginService.loginMenuRequire($scope.userId,function(res) {
		    		// 	$scope.state.signin_end = 'parents';
					// 	$scope.menuLimit.publicMenuMain = res.data.publicMenuList;
		    		// },function(e) {
		    		// 	console.log(e)
		    		// })
		    	}
			},function(e) {
				console.log(e)
			})
		}
		$scope.submitDataTeach = function() {
			var regExp = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/;
			if(!regExp.test($scope.data_teach.username)||$scope.data_teach.username == ''||$scope.data_teach.password =='') {
				$scope.form_error_teach = '请输入符合规则的账号和密码';
				$scope.form_error.noteTeach = true;
				return false;
			}else{
				$scope.form_error.noteTeach = false;
			}
			loginService.loginRequire($scope.data_teach,function(res) {
				if(res.ret == 400) {
		    		$scope.form_error.teach = res.message;
    				$scope.form_error.noteTeach = true;
		    	}else if(res.ret == 200) {
		    		sessionStorage.setItem('userId',res.data.id);
		    		sessionStorage.setItem('userType',res.data.userType);
					var params = {
						uid : res.data.id,
						userType : res.data.userType
					}
					loginService.getUserIdMes(params,function(res){
						if(res.ret==200){
							var userStatus = {userStatus:res.data.userInfo.state};
							userStatus = JSON.stringify(userStatus);
							sessionStorage.setItem('userObj',userStatus);
							$state.go('login_index.sub_index',null,{reload:true})
//							window.location.href=requireIp+'/UcUser/createSession?uid='+params.uid;
						}else if(res.ret==400){
							alert('请求错误请重试')
						}
					},function(e){
						console.log(e)
					})
		    		// loginService.loginMenuRequire($scope.userId,function(res) {
    				// 	var dataStatus = res.data.publicMenuList[0]?Number(res.data.publicMenuList[0].rid) : 0
    				// 	switch(dataStatus){
    				// 		case 1:
    				// 			$scope.state.signin_end='teachMain';
    				// 			$scope.menuLimit.publicMenuMain = res.data.publicMenuList;
    				// 			$scope.menuLimit.publicMenuSub = res.data.personMenuList;
    				// 		break;
    				// 		case 15:
    				// 			$scope.state.signin_end='manage';
    				// 			$scope.menuLimit.publicMenuMain = res.data.publicMenuList;
    				// 			$scope.menuLimit.publicMenuSub = res.data.personMenuList;
    				// 		break;
    				// 		default:
					// 		console.log(123)
    				// 			$scope.state.signin_end = 'teach';
    				// 			$scope.menuLimit.publicMenuMain = res.data.publicMenuList;
    				// 		break;
    				// 	}
					
		    		// },function(e) {
		    		// 	console.log(e)
		    		// })
		    		
		    	}
			},function(e) {
				console.log(e)
			})
		}
		//点击切换家长孩子信息
		$scope.changeChildMes = function(index) {
			$scope.state.child_mes = index;
		};
	function initLogin(){
		//进入页面后判断用户id是否存在
		if(sessionStorage.getItem('userId')) {
			var userObj = {
				uid:sessionStorage.getItem('userId'),
				userType:sessionStorage.getItem('userType')
			};
			var userState = JSON.parse(sessionStorage.getItem('userObj')).userStatus || 0;
			if(userState==0){
				return;
			}
			if(sessionStorage.getItem('userType')==1){
				$scope.state.signin_end='teachMain';
			}else if(sessionStorage.getItem('userType')==2){
				$scope.state.signin_end='teach';
			}else if(sessionStorage.getItem('userType')==3){
				$scope.state.signin_end='teach';
			};
			loginService.getUserIdMes(userObj,function(res) {
				if(res.data.state==0){
					return;
				}
				var userSubObj = JSON.parse(sessionStorage.getItem('userObj')) || new Object();
				if(sessionStorage.getItem('userType')==1){
					userSubObj.oid = res.data.userInfo.officeId;
				}else if(sessionStorage.getItem('userType')==2){
					userSubObj.oid = res.data.stuInfo.officeId;
				}else if(sessionStorage.getItem('userType')==3){
					userSubObj.oid = res.data.stuInfo.officeId;
				}
				userSubObj = JSON.stringify(userSubObj);
				sessionStorage.setItem('userObj',userSubObj);
				switch(sessionStorage.getItem('userType')){
					//选择教师模板
					case '1':
						$scope.state.signin_end='teach';
						$scope.userTtile = res.data.userInfo.realname;
						$scope.state.userFace = res.data.userInfo.userFace;
						loginService.loginMenuRequire($scope.userId,function(res) {
							var dataStatus = res.data.publicMenuList.length+res.data.personMenuList.length;
							switch(dataStatus){
								case 5:
									$scope.state.signin_end='teachMain';
									$scope.menuLimit.publicMenuMain = res.data.publicMenuList;
									$scope.menuLimit.publicMenuSub = res.data.personMenuList;
									userSubObj = JSON.parse(sessionStorage.getItem('userObj'));
									userSubObj.teachStatus = 1;
									userSubObj = JSON.stringify(userSubObj);
									sessionStorage.setItem('userObj',userSubObj);
								break;
								case 3:
									$scope.state.signin_end = 'teach';
									$scope.menuLimit.publicMenuMain = res.data.publicMenuList;
								break;
								default:
									$scope.state.signin_end='manage';
									$scope.menuLimit.publicMenuMain = res.data.publicMenuList;
									$scope.menuLimit.publicMenuSub = res.data.personMenuList;
									userSubObj = JSON.parse(sessionStorage.getItem('userObj'));
									userSubObj.teachStatus = 15;
									userSubObj = JSON.stringify(userSubObj);
									sessionStorage.setItem('userObj',userSubObj);
								break;
							}
						},function(e) {
							console.log(e)
						});
					break;
					//选择学生模板
					case '2':
						$scope.userTtile = res.data.stuInfo.realname;
						if(res.data.stuInfo.userFace==undefined){
							$scope.state.userFace = '';
						}else{
							$scope.state.userFace = res.data.stuInfo.userFace;
						}
						$scope.state.signin_end = 'teach';
						loginService.getUserIdMes(userObj,function(res) {
							$scope.userTtile = res.data.stuInfo.realname;
						},function(e) {
							console.log(e)
						});
						loginService.loginMenuRequire($scope.userId,function(res) {
							$scope.menuLimit.publicMenuMain = res.data.publicMenuList;
						},function(e) {
							console.log(e);
						});
					break;
					//选择家长模板
					case '3':
                        console.log(res)
						$scope.userTtile = res.data.parInfo.realname;
						if(res.data.parInfo.userFace==undefined){
							$scope.state.userFace = '';
						}else{
							$scope.state.userFace = res.data.parInfo.userFace;
                            console.log($scope.state.userFace)
						};
						$scope.sign_parents.list.push(res.data.stuInfo[0]);
						$scope.state.signin_end = 'parents';
						/*loginService.getUserIdMes(userObj,function(res) {
							if(res.ret==200){
								$scope.userTtile = res.data.realname;
							}
						},function(e) {
							console.log(e)
						});*/
						//获取菜单权限
						loginService.loginMenuRequire($scope.userId,function(res) {
							$scope.state.signin_end = 'parents';
							$scope.menuLimit.publicMenuMain = res.data.publicMenuList;
						},function(e) {
							console.log(e)
						});
						//获取孩子信息
						/*loginService.parentChildMsg({uid:userObj.uid},function(res) {
//							= res.data;
						},function(e) {
							console.log(e)
						}) */
					break;
				}
			},function(e) {
				console.log(e)
			});
			
		}
 }
		
		//获取课程中心 学情分析
//		$scope.userPermissions = [{'href':334234,'name':11222},{'href':22333,'name':11222},{'href':334234,'name':11222}];
		$scope.userPermissions = {};
		//绝对路径
//		var absPath = 'http://yun.aletaiedu.net:9007/#/';
		var absPath = 'http://192.168.9.98:8080/JEUC/';
		$http.post(requireIp+'/uc/ucMenu/getMenuByParId',{'parId' : 19}).success(function (res){
			if(res.ret == '200'){
				$scope.userPermissions = res.data;
				console.log($scope.userPermissions);
                
//                console.log($scope.kczxurl)
				if($scope.userId.uid == ''){//用户未登录 跳转登录页
					$scope.kczxurl = absPath + 'login_page';
					angular.forEach($scope.userPermissions,function (v,i){
						v.href = absPath + 'login_page';
					});
				}else{
					angular.forEach($scope.userPermissions,function (v,i){
                        if(v.name=="课程中心"){
                            $scope.kczxurl=v.href + '&userId=' + $scope.userId.uid;
                        }
						v.href = v.href + '&userId=' + $scope.userId.uid;
						console.log(v.href);
					});
				}
			}
		}).error(function (){
			
		});
		
}]);

//图片过滤
app.filter('filterMenesrc',function(){
    return function(str){
        return str.substring(str.indexOf('icon-')+5);
    }
});