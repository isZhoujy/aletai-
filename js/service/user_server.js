
// var requireIp = 'http://192.168.9.60:8080/jeuc/api';
// var requireIp = 'http://198.9.6.61:8080/';
//导入也得改
//var requireIp = 'http://192.168.9.98:80/JEUC/api';
var requireIp = 'http://192.168.9.98:8080/jeuc/api';
app.service('loginService',['$http','$timeout',function($http,$timeout) {
	console.log('service');
	//进入页面后获取id请求用户信息
	this.getUserIdMes = function(uid,succ,error) {
		$http.get(requireIp+'/uc/ucUser/findUserInfoUserId?userId='+uid.uid+'&userType='+uid.userType)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
	}
	//注册请求
	this.registerRequire = function(data,succ,error) {
		$http.post(requireIp+'/uc/ucUserWeb/registerTeacher',data)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			alert("error");
			error(e)
		})
	}
	//登陆请求
	this.loginRequire = function(data,succ,error) {
		$http.post(requireIp+'/uc/login/login',data)
		.success(function(res) {
			succ(res)
			
		})
		.error(function(e) {
			error(e)
		})
	}
	
	//
	//获取菜单权限
	this.loginMenuRequire = function(id,succ,error) {
		$http.post(requireIp+'/uc/ucMenu/getMenuByUid',id)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
	}
	//退出登录
	this.userLoginOut = function(succ,error) {
		$http.get(requireIp+'/uc/login/logout')
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
	}
	//通过家长id获取孩子信息
	this.parentChildMsg = function(pid,succ,error) {
		$http.post(requireIp+'/UcUser/findChildUcUserByUId',pid)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
	}
	


	//教师管理请求
	//请求用户列表
	this.teachHandleUserList = function(parames,succ,error) {
		$http.post(requireIp+'/uc/ucUser/findTeaListByOid',parames)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
	}
	//请求教师管理-审核、删除、回收、停用等接口
	this.teachHandleUpdataList = function(parames,succ,error) {
		$http.post(requireIp+'/uc/ucUser/updateUser',parames)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
	}
	//学生管理
	//通过学校id获取年级
	this.studentHandleGradeList = function(parames,succ,error) {
		$http.post(requireIp+'/ea/eaGrade/findGradeInfoByOid',parames)
		.success(function(res){
			succ(res)
		})
		.error(function(e){
			error(e)
		})
	}
	//通过学校id获取学校信息
	this.getSchoolInfoData = function(parames,succ,error){
		$http.post(requireIp+'/ea/eaOfficeWeb/getSchoolById',parames)
		.success(function(res){
			succ(res)
		})
		.error(function(e){
			error(e)
		})
	}
	//通过班主任id取年级
	this.studentMainleGradeList = function(parames,succ,error) {
		$http.post(requireIp+'/ea/eaClass/findClassInfoByTeaId',parames)
		.success(function(res){
			succ(res)
		})
		.error(function(e){
			error(e)
		})
	}
	//通过年级id获取班级
	this.studentHandleClassList = function(parames,succ,error){
		$http.post(requireIp+'/ea/eaClass/findClassInfoByGid',parames)
		.success(function(res){
			succ(res)
		})
		.error(function(e){
			error(e)
		})
	}
	//通过班级id获取学生信息
	this.studentHandleUserList = function(parames,succ,error) {
		$http.post(requireIp+'/uc/ucUser/findStuInfoByCid',parames)
		.success(function(res){
			succ(res)
		})
		.error(function(e){
			error(e)
		})
	}
	//通过班级ID获取家长信息
	this.parentsHandleUserList = function(parames,succ,error){
		$http.post(requireIp+'/uc/UcStuManagement/getParentsInfo',parames)
		.success(function(res){
			succ(res)
		})
		.error(function(e){
			error(e)
		})
	}
    //通过学生id获取学生信息
    this.studentMsg = function(uid,succ,error){
        $http.post(requireIp+'/uc/ucUser/findUserInfoUserId',uid)
		.success(function(res) {
           succ(res)
		})
		.error(function(e) {
			console.log(uid)
		})
    };
    //学生管理上传excel文件
    this.uploadExcel = function(fd,succ,error){
    	$http({
    		url:requireIp+'/uc/ucUser/uploadUserExcel',
    		method:'POST',
    		data:fd,
    		headers: {'Content-Type':undefined},
            transformRequest: angular.identity 
    	})
		.success(function(res) {
           succ(res)
		})
		.error(function(e) {
			error(e)
		})
    };
    //教师管理上传excel文件
    this.uploadExcelTea = function(fd,succ,error){
    	$http({
    		url:requireIp+'/uc/ucUser/uploadUserExcel',
    		method:'POST',
    		data:fd,
    		headers: {'Content-Type':undefined},
            transformRequest: angular.identity 
    	})
		.success(function(res) {
           succ(res)
		})
		.error(function(e) {
			error(e)
		})
    };
    //家长管理上传excel文件
    this.uploadExcelParent = function(fd,succ,error){
    	$http({
    		url:requireIp+'/uc/ucUser/uploadUserExcel',
    		method:'POST',
    		data:fd,
    		headers: {'Content-Type':undefined},
            transformRequest: angular.identity 
    	})
		.success(function(res) {
           succ(res)
		})
		.error(function(e) {
			error(e)
		})
    };
    //学生管理新增接口
    this.addNewStudentMes = function(param,succ,error){
    	$http.post(requireIp+'/uc/ucUser/saveStu',param)
    	.success(function(res){
    		succ(res)
    	})
    	.error(function(e){
    		error(e)
    	})
    }
    //教师管理新增接口
    this.addNewTeacherMes = function(param,succ,error){
    	$http.post(requireIp+'/uc/ucUser/saveTea',param)
    	.success(function(res){
    		succ(res)
    	})
    	.error(function(e){
    		error(e)
    	})
    };
    //家长获取信息
    this.getParentList = function(param,succ,error){
    	$http.post(requireIp+'/uc/ucUser/findParInfoByCid',param)
    	.success(function(res){
    		succ(res)
    	})
    	.error(function(e){
    		error(e)
    	})
    }
    //家长新增信息
    this.getAddParentList = function(param,succ,error){
    	$http.post(requireIp+'/uc/ucUser/addParent',param)
    	.success(function(res){
    		succ(res)
    	})
    	.error(function(e){
    		error(e)
    	})
    }
}])
