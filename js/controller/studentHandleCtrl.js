app.controller('studentHandleCtrl',['$scope','$state','$timeout','$http','loginService',function($scope,$state,$timeout,$http,loginService) {
    if(sessionStorage.getItem('tableChange')==null){
        sessionStorage.setItem('tableChange',0)
    }
 	var teachMain = {
        teaId:sessionStorage.getItem('userId')
    };
    var pageSize = 10;
    $scope.state = {
        headTab:0,//判断头部选项卡
        gradeState:0,//判断年级
        classState:0,//判断班级
        studentOnlineChecked:false,//在线学生-判断是否选中
        studentStopChecked:false,//停用账号-判断是否选中
        studentRecoverChecked:false,//回收站-判断是否选中
        studentOnlineCount:0,//学生人数
        warningShow:false,
        deletStatus : false,
        imgNotice : 'img/wonde_big.png',
        sureDeletContent:'确认删除所选同学？',
        AddState:false,//新增按钮行是否显示
        addStudentNumber:'',//国网学籍号
        addStudentName:'',//新增学生姓名
        addGradeList:[],//新增年级
        addClassList:[],//新增班级
        teaGradeId:'',//新增学校id
        teaClassId:'',//新增班级id
        modelDown:requireIp,
    }
    $scope.state.headTab = sessionStorage.getItem('tableChange') || 0;
    //模拟数据
     $scope.studentList = {
        checkboxArr : [],
        checkboxStopArr:[],
        checkboxReArr:[],
        gradeList:[
        ],
        classList:[
            {name:'全部',id:'all'},
        ],
        tableMsgList:[
        ],
        tableMsgListStop:[
        ],
        tableMsgListRecover:[
        ]
    }
    //点击hide删除弹窗
    $scope.gbtc = function(){
        $scope.state.deletStatus = false;
    }
     //学生在线头部确认删除
    $scope.suredel = function(){
        $scope.state.deletStatus = false;
        if(sessionStorage.getItem('tableChange')==0){
            $scope.studentOnlineAction('delet');
        }else if(sessionStorage.getItem('tableChange')==2){
            $scope.studentStopRenew('delet');
        }else if(sessionStorage.getItem('tableChange')==3){
            $scope.studentRecoverRenew('delet');
        }
    }
    //点击头部的确认删除按钮
    $scope.studentDelet = function(status){
        switch(status){
            case 'online':
                if(!$scope.studentList.checkboxArr.length){
                    $scope.state.warningShow = true;
                    $scope.state.imgNotice = 'img/wonde_big.png';
                    $scope.state.noteContent = '请至少选择一项!';
                    $timeout(function(){
                        $scope.state.warningShow = false;
                    },1000);
                    return false;
                }
                $scope.state.sureDeletContent = '确认删除所选同学？'
            break;
            case 'stop':
                if(!$scope.studentList.checkboxStopArr.length){
                    $scope.state.warningShow = true;
                    $scope.state.imgNotice = 'img/wonde_big.png';
                    $scope.state.noteContent = '请至少选择一项!';
                    $timeout(function(){
                        $scope.state.warningShow = false;
                    },1000)
                    return false
                }
                $scope.state.sureDeletContent = '确认删除所选同学？'
            break;
            case 'recover':
                if(!$scope.studentList.checkboxReArr.length){
                    $scope.state.warningShow = true;
                    $scope.state.imgNotice = 'img/wonde_big.png';
                    $scope.state.noteContent = '请至少选择一项!';
                    $timeout(function(){
                        $scope.state.warningShow = false;
                    },1000)
                    return false
                }
                $scope.state.sureDeletContent = '确认彻底删除所选同学？(该操作不可恢复)'
            break;
        }
        $scope.state.deletStatus = true;
    }
    //点击头部选项卡
    $scope.changeTab = function(state) {
        sessionStorage.setItem('tableChange',state);
        $scope.state.headTab = state;
        // $state.go('teacher_index.student_handle',{tableChange:state})
    }
    //进入页面加载请求年级和班级
    var schoolId = {
        officeId:JSON.parse(sessionStorage.getItem('userObj')).oid
    };
   
    var gradeListStatus = JSON.parse(sessionStorage.getItem('userObj')).teachStatus;
    $scope.changeSref = function(id){
        $state.go('teacher_index.manager_updataStudent',{studentCard:id});
    };
    var teachMainClassId = '';
    if(gradeListStatus==1){
    	$scope.studentList.classList = [];
    	console.log(teachMain)
        loginService.studentMainleGradeList(teachMain,function(res){
            $scope.state.gradeState = res.data.gradeId;
            $scope.studentList.gradeList = $scope.studentList.gradeList.concat(res.data);
            $scope.state.classState = res.data.id;
            teachMainClassId = res.data.id;
            $scope.studentList.classList = $scope.studentList.classList.concat(res.data);
            loginService.studentHandleUserList({
                gradeId : $scope.state.gradeState,
                classId : res.data.id,
                delFlag:0,
                state:1,
                pageNo : 1,
                pageSize : pageSize
            },function(res){
                if(res.ret==200){
                    $scope.studentList.tableMsgList = res.data.list;
                    $scope.studentPaginationOnline.totalItems = res.data.count;
                    $scope.state.studentOnlineCount = res.data.count;
                }else if(res.ret==400){
                    // $scope.state.warningShow = false;
                    $scope.studentList.tableMsgList = [];
                    $scope.state.studentOnlineCount = 0;
                    $scope.studentPaginationOnline.totalItems = 0;
                }
                
            },function(e){
                console.log(e)
            });
            //学生停用账号
            loginService.studentHandleUserList({
                gradeId : $scope.state.gradeState,
                classId : res.data.id,
                delFlag:0,
                state:2,
                pageNo : 1,
                pageSize : pageSize
            },function(res){
                if(res.ret==200){
                    $scope.studentList.tableMsgListStop = res.data.list;
                    $scope.studentPaginationStop.totalItems = res.data.count;
                    $scope.state.studentStopCount = res.data.count;
                }else if(res.ret==400){
                    $scope.studentList.tableMsgListStop = [];
                    $scope.state.studentStopCount = 0;
                    $scope.studentPaginationStop.totalItems = 0;
                }
            },function(e){
                console.log(e)
            });
            //学生回收账号
            loginService.studentHandleUserList({
                gradeId : $scope.state.gradeState,
                classId : res.data.id,
                delFlag:3,
                pageNo : 1,
                pageSize : pageSize
            },function(res){
                if(res.ret==200){
                    $scope.studentList.tableMsgListRecover = res.data.list;
                    $scope.studentPaginationRecover.totalItems = res.data.count;
                    $scope.state.studentRecoverCount = res.data.count;
                }else if(res.ret==400){
                    // $scope.state.noteContent = '该班级没有学生';
                    // $scope.state.warningShow = true;
                    $scope.studentList.tableMsgListRecover = [];
                    $scope.state.studentRecoverCount = 0;
                    $scope.studentPaginationRecover.totalItems = 0;
                    // $timeout(function(){
                    //     $scope.state.warningShow = false;
                    // },500)
                }
            },function(e){
                console.log(e)
            });
        },function(e){
            console.log(e)
        });
    }else if(gradeListStatus==15){
        //在线学生请求班级数据
        loginService.studentHandleGradeList(schoolId,function(res){
            $scope.state.gradeState = res.data[0].id;
            $scope.studentList.gradeList = $scope.studentList.gradeList.concat(res.data);
            $scope.state.addGradeList = res.data;
            //通过年级id获取班级信息
            loginService.studentHandleClassList({gradeId:$scope.state.gradeState},function(res){
                if(res.ret==200){
                    $scope.state.classState = res.data[0].id;
                    $scope.studentList.classList = $scope.studentList.classList.concat(res.data);
                    $scope.state.addClassList = res.data;
                    loginService.studentHandleUserList({
                        gradeId : $scope.state.gradeState,
                        classId : res.data[0].id,
                        delFlag:0,
                        state:1,
                        pageNo : 1,
                        pageSize : pageSize
                    },function(res){
                        if(res.ret==200){
                            $scope.studentList.tableMsgList = res.data.list;
                            $scope.studentPaginationOnline.totalItems = res.data.count;
                            $scope.state.studentOnlineCount = res.data.count;
                        }else if(res.ret==400){
                            // $scope.state.warningShow = false;
                            $scope.studentList.tableMsgList = [];
                            $scope.state.studentOnlineCount = 0;
                            $scope.studentPaginationOnline.totalItems = 0;
                        }
                    },function(e){
                        console.log(e)
                    });
                }else{
                    $scope.state.warningShow = true;
                    $scope.state.imgNotice = 'img/wonde_big.png';
                    $scope.state.noteContent = '年级无班级数据!';
                    $timeout(function(){
                        $scope.state.warningShow = false;
                    },500)
                }
                
                //学生停用账号
                loginService.studentHandleUserList({
                    gradeId : $scope.state.gradeState,
                    classId : res.data[0].id,
                    delFlag:0,
                    state:2,
                    pageNo : 1,
                    pageSize : pageSize
                },function(res){
                    if(res.ret==200){
                        $scope.studentList.tableMsgListStop = res.data.list;
                        $scope.studentPaginationStop.totalItems = res.data.count;
                        $scope.state.studentStopCount = res.data.count;
                    }else if(res.ret==400){
                        $scope.studentList.tableMsgListStop = [];
                        $scope.state.studentStopCount = 0;
                        $scope.studentPaginationStop.totalItems = 0;
                    }
                },function(e){
                    console.log(e)
                });
                //学生回收账号
                loginService.studentHandleUserList({
                    gradeId : $scope.state.gradeState,
                    classId : res.data[0].id,
                    delFlag:3,
                    pageNo : 1,
                    pageSize : pageSize
                },function(res){
                    if(res.ret==200){
                        $scope.studentList.tableMsgListRecover = res.data.list;
                        $scope.studentPaginationRecover.totalItems = res.data.count;
                        $scope.state.studentRecoverCount = res.data.count;
                    }else if(res.ret==400){
                        // $scope.state.noteContent = '该班级没有学生';
                        // $scope.state.warningShow = true;
                        $scope.studentList.tableMsgListRecover = [];
                        $scope.state.studentRecoverCount = 0;
                        $scope.studentPaginationRecover.totalItems = 0;
                        // $timeout(function(){
                        //     $scope.state.warningShow = false;
                        // },500)
                    }
                },function(e){
                    console.log(e)
                });
            },function(e){
                console.log(e)
            })
        },function(e){
            console.log(e)
        });
    }
    
    //点击在线学生全选
    $scope.onlineCheckAction = function(event) {
        if($scope.state.studentOnlineChecked){
            $scope.studentList.checkboxArr = [];
            $scope.studentList.tableMsgList.forEach(function(v) {
                $scope.studentList.checkboxArr.push(v.id)
            })
        }else{
             $scope.studentList.checkboxArr=  [];
        }
    }
    //点击停用学生全选
    $scope.stopCheckAction = function(event) {
        if($scope.state.studentStopChecked){
            $scope.studentList.checkboxStopArr = [];
            $scope.studentList.tableMsgListStop.forEach(function(v) {
                $scope.studentList.checkboxStopArr.push(v.id)
            })
        }else{
             $scope.studentList.checkboxStopArr=  [];
        }
    }
     //点击回收站全选
    $scope.recoverCheckAction = function(event) {
        if($scope.state.studentRecoverChecked){
            $scope.studentList.checkboxReArr = [];
            $scope.studentList.tableMsgListRecover.forEach(function(v) {
                $scope.studentList.checkboxReArr.push(v.id)
            })
        }else{
             $scope.studentList.checkboxReArr=  [];
        }
    }
    //学生在线单选的选中状态
    $scope.isChecked = function(id) {
        return  $scope.studentList.checkboxArr.indexOf(id)>=0
    }
    //停用账号单选的选中状态
    $scope.isCheckedStop = function(id) {
        return  $scope.studentList.checkboxStopArr.indexOf(id)>=0
    }
    //回收站单选的选中状态
    $scope.isCheckedRe = function(id) {
        return  $scope.studentList.checkboxReArr.indexOf(id)>=0
    };
    var onlineState = [];
    var onlineName = [];
     //学生在线点击单个checkbox
    $scope.changeOnlineCheck = function(event,item) {
        var action = event.target.checked?'add':'remove';
        if(action=='add'&&$scope.studentList.checkboxArr.indexOf(item.id)==-1){
            $scope.studentList.checkboxArr.push(item.id);
            onlineState.push(item.state);
            onlineName.push(item.realname);
            if($scope.studentList.checkboxArr.length==$scope.studentList.tableMsgList.length){
                $scope.state.studentOnlineChecked = true
            }
        }
        if(action=='remove'&&$scope.studentList.checkboxArr.indexOf(item.id)!=-1){
            var inx = $scope.studentList.checkboxArr.indexOf(item.id);
            var sta = onlineState.indexOf(item.state);
            var real = onlineName.indexOf(item.realname);
            $scope.studentList.checkboxArr.splice(inx,1);
            onlineState.splice(sta,1);
            onlineName.splice(real,1);
            $scope.state.studentOnlineChecked = false
        }
    }
      //帐号停用点击单个checkbox
    $scope.changeStopCheck = function(event,id) {
        var action = event.target.checked?'add':'remove';
        if(action=='add'&&$scope.studentList.checkboxStopArr.indexOf(id)==-1){
            $scope.studentList.checkboxStopArr.push(id);
            if($scope.studentList.checkboxStopArr.length==$scope.studentList.tableMsgListStop.length){
                $scope.state.studentStopChecked = true
            }
        }
        if(action=='remove'&&$scope.studentList.checkboxStopArr.indexOf(id)!=-1){
            var inx = $scope.studentList.checkboxStopArr.indexOf(id);
            $scope.studentList.checkboxStopArr.splice(inx,1);
            $scope.state.studentStopChecked = false
        }
    }
      //回收站点击单个checkbox 
    $scope.changeRecoverCheck = function(event,id) {
        var action = event.target.checked?'add':'remove';
        if(action=='add'&&$scope.studentList.checkboxReArr.indexOf(id)==-1){
            $scope.studentList.checkboxReArr.push(id);
            if($scope.studentList.checkboxReArr.length==$scope.studentList.tableMsgListRecover.length){
                $scope.state.studentRecoverChecked = true
            }
        }
        if(action=='remove'&&$scope.studentList.checkboxReArr.indexOf(id)!=-1){
            var inx = $scope.studentList.checkboxReArr.indexOf(id);
            $scope.studentList.checkboxReArr.splice(inx,1);
            $scope.state.studentRecoverChecked = false
        }
    }
    //点击年级
    $scope.changeGreade = function(gradeId){
        $scope.state.gradeState = gradeId;
        if(gradeListStatus==1) return false;
        loginService.studentHandleClassList({gradeId:gradeId},function(res){
            $scope.state.classState = res.data[0].id;
            $scope.studentList.classList  = [{name:'全部',id:'all'}];
            $scope.studentList.classList = $scope.studentList.classList.concat(res.data);
            loginService.studentHandleUserList({
                gradeId : $scope.state.gradeState,
                classId : res.data[0].id,
                delFlag:0,
                state:1,
                pageNo : 1,
                pageSize : pageSize
            },function(res){
                if(res.ret==200){
                	console.log(res)
                    $scope.studentList.tableMsgList = res.data.list;
                    $scope.studentPaginationOnline.totalItems = res.data.count;
                    $scope.state.studentOnlineCount = res.data.count;
                }else if(res.ret==400){
                    // $scope.state.noteContent = '该班级没有学生';
                    // $scope.state.warningShow = true;
                    $scope.studentList.tableMsgList = [];
                    $scope.state.studentOnlineCount = 0;
                    $scope.studentPaginationOnline.totalItems = 0;
                }
            },function(e){
                console.log(e)
            });
             //学生停用账号
            loginService.studentHandleUserList({
                gradeId : $scope.state.gradeState,
                classId : res.data[0].id,
                delFlag:0,
                state:2,
                pageNo : 1,
                pageSize : pageSize
            },function(res){
                if(res.ret==200){
                    $scope.studentList.tableMsgListStop = res.data.list;
                    $scope.studentPaginationStop.totalItems = res.data.count;
                    $scope.state.studentStopCount = res.data.count;
                }else if(res.ret==400){
                    $scope.studentList.tableMsgListStop = [];
                    $scope.state.studentStopCount = 0;
                    $scope.studentPaginationStop.totalItems = 0;
                }
            },function(e){
                console.log(e)
            });
            //学生回收账号
            loginService.studentHandleUserList({
                gradeId : $scope.state.gradeState,
                classId : res.data[0].id,
                delFlag:3,
                pageNo : 1,
                pageSize : pageSize
            },function(res){
                if(res.ret==200){
                    $scope.studentList.tableMsgListRecover = res.data.list;
                    $scope.studentPaginationRecover.totalItems = res.data.count;
                    $scope.state.studentRecoverCount = res.data.count;
                }else if(res.ret==400){
                    // $scope.state.noteContent = '该班级没有学生';
                    // $scope.state.warningShow = true;
                    $scope.studentList.tableMsgListRecover = [];
                    $scope.state.studentRecoverCount = 0;
                    $scope.studentPaginationRecover.totalItems = 0;
                    // $timeout(function(){
                    //     $scope.state.warningShow = false;
                    // },500)
                }
            },function(e){
                console.log(e)
            });
        },function(e){
            console.log(e)
        })
    };
    //点击班级
     $scope.changeClass = function(classId){
        $scope.state.classState = classId;
        if(gradeListStatus==1) return false;
        $scope.studentPaginationOnline.currentPage = 1;
        $scope.studentPaginationStop.currentPage = 1;
        $scope.studentPaginationRecover.currentPage = 1;
        var objOnline = {
            gradeId : $scope.state.gradeState,
            classId : classId,
            delFlag : 0,
            state:1,
            pageNo : 1,
            pageSize : pageSize
        }
        var objStop = {
            gradeId : $scope.state.gradeState,
            classId : classId,
            delFlag : 0,
            state:2,
            pageNo : 1,
            pageSize : pageSize
        }
        var objRecover = {
            gradeId : $scope.state.gradeState,
            classId : classId,
            delFlag : 3,
            pageNo : 1,
            pageSize : pageSize
        }
        if(classId=='all'){
            objOnline.classId = null;
            objStop.classId = null;
            objRecover.classId = null
            $scope.state.warningShow = true;
            $scope.state.imgNotice = 'img/wonde_big.png';
            $scope.state.noteContent = '稍等一会';
        }
        // 学生在线
        loginService.studentHandleUserList(objOnline,function(res){
            if(sessionStorage.getItem('tableChange')==0){
                $scope.state.warningShow = false;
            }
            if(res.ret==200){
                $scope.studentList.tableMsgList = res.data.list;
                $scope.studentPaginationOnline.totalItems = res.data.count;
                $scope.state.studentOnlineCount = res.data.count;
            }else if(res.ret==400){
                $scope.studentList.tableMsgList = [];
                $scope.state.studentOnlineCount = 0;
                $scope.studentPaginationOnline.totalItems = 0;
            }
        },function(e){
            $scope.state.warningShow = true;
            $scope.state.imgNotice = 'img/wonde_big.png';
            $scope.state.noteContent = '服务器错误请刷新页面重试';
            $timeout(function(){
                $scope.state.warningShow = false;
            },1000)
            console.log(e)
        });
        //停用
        loginService.studentHandleUserList(objStop,function(res){
            if(sessionStorage.getItem('tableChange')==2){
                $scope.state.warningShow = false;
            };
            if(res.ret==200){
                // $scope.state.warningShow = false;
                $scope.studentList.tableMsgListStop = res.data.list;
                $scope.studentPaginationStop.totalItems = res.data.count;
                $scope.state.studentStopCount = res.data.count;
            }else if(res.ret==400){
                $scope.studentList.tableMsgListStop = [];
                $scope.state.studentStopCount = 0;
                $scope.studentPaginationStop.totalItems = 0;
            }
        },function(e){
            $scope.state.warningShow = true;
            $scope.state.imgNotice = 'img/wonde_big.png';
            $scope.state.noteContent = '服务器错误请刷新页面重试';
            console.log(e)
        });
        //回收站
        loginService.studentHandleUserList(objRecover,function(res){
             if(sessionStorage.getItem('tableChange')==3){
                $scope.state.warningShow = false;
            }
            if(res.ret==200){
                $scope.studentList.tableMsgListRecover = res.data.list;
                $scope.studentPaginationRecover.totalItems = res.data.count;
                $scope.state.studentRecoverCount = res.data.count;
            }else if(res.ret==400){
                $scope.studentList.tableMsgListRecover = [];
                $scope.state.studentRecoverCount = 0;
                $scope.studentPaginationRecover.totalItems = 0;
            }
        },function(e){
            $scope.state.warningShow = true;
            $scope.state.imgNotice = 'img/wonde_big.png';
            $scope.state.noteContent = '服务器错误请刷新页面重试';
            console.log(e)
        });
    };
    //新增学生事件
    $scope.addOnlineAction = function(state){
   		switch(state){
   			case 'add':
   				$scope.state.AddState = true;
   			break;
   			case 'cancel':
   				$scope.state.AddState = false;
// 				$scope.state.addStudentName = '';
//	            $scope.state.addStudentNumber = '';
   			break;
   		}
    };
    //新增内选择年级获取班级
    $scope.gradeChange = function(id){
    	$scope.state.teaClassId = '';
    	loginService.studentHandleClassList({gradeId:id},function(res){
    		if(res.ret==200){
    			$scope.state.addClassList = res.data;
    		}else{
				$scope.state.warningShow = true;
	            $scope.state.imgNotice = 'img/wonde_big.png';
	            $scope.state.noteContent = res.message;
	            $timeout(function(){
	                $scope.state.warningShow = false;
	            },1000);    			
    		}
    	},function(e){
    		console.log(e)
    	})
    };
    //确认新增学生按钮
    $scope.sureAddStudent = function(stuname,stunum){
    	var regExp = /^[G|L][1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    	if(stuname==''){
    		$scope.state.warningShow = true;
            $scope.state.imgNotice = 'img/wonde_big.png';
            $scope.state.noteContent = '请输入学生姓名!';
            $timeout(function(){
                $scope.state.warningShow = false;
            },1000);
            return false;
    	}else if(stunum==''||!regExp.test(stunum)){
    		$scope.state.warningShow = true;
            $scope.state.imgNotice = 'img/wonde_big.png';
            $scope.state.noteContent = '请输入符合规则的国网学籍号!';
            $timeout(function(){
                $scope.state.warningShow = false;
            },1000);
            return false;
    	};
    	var params = {
    		realname:stuname,
    		stuNo:stunum,
    		gradeId:$scope.state.gradeState,
    		classId:$scope.state.classState,
    		createBy:teachMain.teaId
    	};
    	if(gradeListStatus==15){
    		if($scope.state.teaGradeId==''){
    			$scope.state.warningShow = true;
	            $scope.state.imgNotice = 'img/wonde_big.png';
	            $scope.state.noteContent = '请选择年级!';
	            $timeout(function(){
	                $scope.state.warningShow = false;
	            },1000);
	            return false;
    		}else if($scope.state.teaClassId==''){
    			$scope.state.warningShow = true;
	            $scope.state.imgNotice = 'img/wonde_big.png';
	            $scope.state.noteContent = '请选择班级!';
	            $timeout(function(){
	                $scope.state.warningShow = false;
	            },1000);
	            return false;
    		};
    		params.gradeId = $scope.state.teaGradeId;
    		params.classId = $scope.state.teaClassId;
    	};
    	loginService.addNewStudentMes(params,function(res){
    		if(res.ret==200){
    			$scope.state.warningShow = true;
	            $scope.state.imgNotice = 'img/chenggong.png';
	            $scope.state.noteContent = res.message;
	            $scope.state.addStudentName = '';
	            $scope.state.addStudentNumber = '';
	            $scope.state.teaGradeId = '';
	            $scope.state.teaClassId = '';
	            $timeout(function(){
	                $scope.state.warningShow = false;
	            },1000);
	            // 学生在线
	             var objOnline = {
		            gradeId : $scope.state.gradeState,
		            classId : $scope.state.classState,
		            delFlag : 0,
		            state:1,
		            pageNo : 1,
		            pageSize : pageSize
		        };
		        loginService.studentHandleUserList(objOnline,function(res){
		            if(res.ret==200){
		                $scope.studentList.tableMsgList = res.data.list;
		                $scope.studentPaginationOnline.totalItems = res.data.count;
		                $scope.state.studentOnlineCount = res.data.count;
		            }else if(res.ret==400){
		                $scope.studentList.tableMsgList = [];
		                $scope.state.studentOnlineCount = 0;
		                $scope.studentPaginationOnline.totalItems = 0;
		                $scope.state.warningShow = true;
			            $scope.state.imgNotice = 'img/wonde_big.png';
			            $scope.state.noteContent = res.message;
			            $timeout(function(){
			                $scope.state.warningShow = false;
			            },1000)
		            }
		        },function(e){
		            $scope.state.warningShow = true;
		            $scope.state.imgNotice = 'img/wonde_big.png';
		            $scope.state.noteContent = '服务器错误请刷新页面重试';
		            $timeout(function(){
		                $scope.state.warningShow = false;
		            },1000)
		        });
    		}else{
    			$scope.state.warningShow = true;
	            $scope.state.imgNotice = 'img/wonde_big.png';
	            $scope.state.noteContent = res.message;
	            $timeout(function(){
	                $scope.state.warningShow = false;
	            },1000);
    		}
    	},function(e){
    		$scope.state.warningShow = true;
            $scope.state.imgNotice = 'img/wonde_big.png';
            $scope.state.noteContent = '服务器挂掉了';
            $timeout(function(){
                $scope.state.warningShow = false;
            },1000);
            console.log(e);
    	});
    };
    //上传文件
    $scope.fileAction = function(me){
    	$scope.state.warningShow = true;
        $scope.state.imgNotice = 'img/wonde_big.png';
        $scope.state.noteContent = '上传中，请稍等!';
    	var fd = new FormData();
        var file = me.files[0];
        fd.append('excelFile', file);
        fd.append("userId",sessionStorage.getItem('userId'));
        fd.append("type",'2');
        loginService.uploadExcel(fd,function(res){
        	if(res.ret==200){
		      	$scope.state.imgNotice = 'img/chenggong.png';
		      	$scope.state.noteContent = '上传成功';	
		      	$timeout(function(){
		      		$scope.state.warningShow = false;
		      		$state.go('teacher_index.student_handle',null,{reload:true})
		      	},1500)
			}else if(res.ret == 400){
		      	$scope.state.noteContent = res.message+',请重新上传!';
		      	$timeout(function(){
		      		$scope.state.warningShow = false;
		      	},1500)
			}else if(res.ret == 500){
		      	$scope.state.noteContent = res.message+',请重新上传!';
		      	$timeout(function(){
		      		$scope.state.warningShow = false;
		      	},1500)
			}
        },function(e){
        	$scope.state.noteContent = '服务器错误，请稍候再试!';
	      	$timeout(function(){
	      		$scope.state.warningShow = false;
	      	},1500)
        });
        me.value = '';
    }
    //学生在线的头部按钮事件
    $scope.studentOnlineAction = function(stateAction){
        if(!$scope.studentList.checkboxArr.length){
            $scope.state.warningShow = true;
            $scope.state.imgNotice = 'img/wonde_big.png';
            $scope.state.noteContent = '请至少选择一项!';
            $timeout(function(){
                $scope.state.warningShow = false;
            },1000)
             return false
        }
        switch(stateAction){
        	case 'checked':
        		var params = {
                    ids : $scope.studentList.checkboxArr.join(','),
                    delFlag : 0,
                    state : 1,
                    updateBy:teachMain.teaId
                }
                $scope.state.imgNotice = 'img/chenggong.png';
                $scope.state.noteContent = '审核成功！';
        	break;
            case 'stop':
                var params = {
                    ids : $scope.studentList.checkboxArr.join(','),
                    delFlag : 0,
                    state : 2,
                    updateBy:teachMain.teaId
                };
                $scope.state.imgNotice = 'img/chenggong.png';
                var requestState = onlineState.some(function(v,i){
		        	$scope.state.noteContent = onlineName[i]+'未审核,不能停用';
		        	return v==0;
		        });
		        if(!requestState){
		        	$scope.state.noteContent = '停用成功！';
		        }
            break;
            case 'reset':
                var params = {
                    ids : $scope.studentList.checkboxArr.join(','),
                    updateBy:teachMain.teaId
                }
                $scope.state.imgNotice = 'img/chenggong.png';
                $scope.state.noteContent = '密码重置成功！';
            break;
            case 'delet':
                var params = {
                    ids : $scope.studentList.checkboxArr.join(','),
                    delFlag : 3,
                    updateBy:teachMain.teaId
                }
                $scope.state.imgNotice = 'img/chenggong.png';
                $scope.state.noteContent = '所选用户已成功删除！';
            break;
        };
        if(requestState){
        	$scope.state.imgNotice = 'img/wonde_big.png';
            $scope.state.warningShow = true;
            $timeout(function(){
                $scope.state.warningShow = false;
            },1000);
            return false;
        };
        loginService.teachHandleUpdataList(params,function(res){
            if(res.ret==200){
                $scope.state.warningShow = true;
                $scope.state.studentOnlineChecked = false;
                $scope.studentList.checkboxArr = [];
                $scope.studentList.checkboxStopArr = [];
                $scope.studentList.checkboxReArr = [];
                //$state.go('teacher_index.student_handle',null,{reload:true})
                var classState = $scope.state.classState=='all'? null:$scope.state.classState;
                loginService.studentHandleUserList({
                    gradeId : $scope.state.gradeState,
                    classId : classState,
                    delFlag:0,
                    state:1,
                    pageNo : 1,
                    pageSize : pageSize
                },function(res){
                    $scope.state.warningShow = false;
                    if(res.ret==200){
                    	onlineState = [];
                    	onlineName = [];
                    	console.log(res.data)
                        $scope.studentList.tableMsgList = res.data.list;
                        $scope.studentPaginationOnline.totalItems = res.data.count;
                        $scope.state.studentOnlineCount = res.data.count;
                    }else if(res.ret==400){
                        $scope.studentList.tableMsgList = [];
                        $scope.state.studentOnlineCount = 0;
                        $scope.studentPaginationOnline.totalItems = 0;
                    }
                },function(e){
                    console.log(e)
                });
                //学生停用账号
                loginService.studentHandleUserList({
                    gradeId : $scope.state.gradeState,
                    classId : classState,
                    delFlag:0,
                    state:2,
                    pageNo : 1,
                    pageSize : pageSize
                },function(res){
                    if(res.ret==200){
                        $scope.studentList.tableMsgListStop = res.data.list;
                        $scope.studentPaginationStop.totalItems = res.data.count;
                        $scope.state.studentStopCount = res.data.count;
                    }else if(res.ret==400){
                        $scope.studentList.tableMsgListStop = [];
                        $scope.state.studentStopCount = 0;
                        $scope.studentPaginationStop.totalItems = 0;
                    }
                },function(e){
                    console.log(e)
                });
                //学生回收账号
                loginService.studentHandleUserList({
                    gradeId : $scope.state.gradeState,
                    classId : classState,
                    delFlag:3,
                    pageNo : 1,
                    pageSize : pageSize
                },function(res){
                    if(res.ret==200){
                        $scope.studentList.tableMsgListRecover = res.data.list;
                        $scope.studentPaginationRecover.totalItems = res.data.count;
                        $scope.state.studentRecoverCount = res.data.count;
                    }else if(res.ret==400){
                        // $scope.state.noteContent = '该班级没有学生';
                        // $scope.state.warningShow = true;
                        $scope.studentList.tableMsgListRecover = [];
                        $scope.state.studentRecoverCount = 0;
                        $scope.studentPaginationRecover.totalItems = 0;
                        // $timeout(function(){
                        //     $scope.state.warningShow = false;
                        // },500)
                    }
                },function(e){
                    console.log(e)
                });
            }
        },function(e){
            console.log(e)
        })
    }
    //学生停用的头部按钮事件
    $scope.studentStopRenew = function(stateAction) {
        if(!$scope.studentList.checkboxStopArr.length){
            $scope.state.warningShow = true;
            $scope.state.imgNotice = 'img/wonde_big.png';
            $scope.state.noteContent = '请至少选择一项!';
            $timeout(function(){
                $scope.state.warningShow = false;
            },1000)
             return false
        }
        switch(stateAction){
            case 'renew':
                var params = {
                    ids : $scope.studentList.checkboxStopArr.join(','),
                    delFlag : 0,
                    state:1,
                    updateBy:teachMain.teaId
                }
                $scope.state.imgNotice = 'img/chenggong.png';
                $scope.state.noteContent = '所选用户已成功启用！';
            break;
            case 'delet':
                var params = {
                    ids : $scope.studentList.checkboxStopArr.join(','),
                    delFlag : 3,
                    updateBy:teachMain.teaId
                }
                $scope.state.imgNotice = 'img/chenggong.png';
                $scope.state.noteContent = '所选用户已成功删除！';
            break;
        }
        loginService.teachHandleUpdataList(params,function(res){
            if(res.ret==200){
                $scope.state.warningShow = true;
                $scope.state.studentStopChecked = false;
                $scope.studentList.checkboxArr = [];
                $scope.studentList.checkboxStopArr = [];
                $scope.studentList.checkboxReArr = [];
                var classState = $scope.state.classState=='all'? null:$scope.state.classState;
                loginService.studentHandleUserList({
                    gradeId : $scope.state.gradeState,
                    classId : classState,
                    delFlag:0,
                    state:1,
                    pageNo : 1,
                    pageSize : pageSize
                },function(res){
                    $scope.state.warningShow = false;
                    if(res.ret==200){
                        $scope.studentList.tableMsgList = res.data.list;
                        $scope.studentPaginationOnline.totalItems = res.data.count;
                        $scope.state.studentOnlineCount = res.data.count;
                    }else if(res.ret==400){
                        $scope.studentList.tableMsgList = [];
                        $scope.state.studentOnlineCount = 0;
                        $scope.studentPaginationOnline.totalItems = 0;
                    }
                },function(e){
                    console.log(e)
                });
                //学生停用账号
                loginService.studentHandleUserList({
                    gradeId : $scope.state.gradeState,
                    classId : classState,
                    delFlag:0,
                    state:2,
                    pageNo : 1,
                    pageSize : pageSize
                },function(res){
                    if(res.ret==200){
                        $scope.studentList.tableMsgListStop = res.data.list;
                        $scope.studentPaginationStop.totalItems = res.data.count;
                        $scope.state.studentStopCount = res.data.count;
                    }else if(res.ret==400){
                        $scope.studentList.tableMsgListStop = [];
                        $scope.state.studentStopCount = 0;
                        $scope.studentPaginationStop.totalItems = 0;
                    }
                },function(e){
                    console.log(e)
                });
                //学生回收账号
                loginService.studentHandleUserList({
                    gradeId : $scope.state.gradeState,
                    classId : classState,
                    delFlag:3,
                    pageNo : 1,
                    pageSize : pageSize
                },function(res){
                    if(res.ret==200){
                        $scope.studentList.tableMsgListRecover = res.data.list;
                        $scope.studentPaginationRecover.totalItems = res.data.count;
                        $scope.state.studentRecoverCount = res.data.count;
                    }else if(res.ret==400){
                        // $scope.state.noteContent = '该班级没有学生';
                        // $scope.state.warningShow = true;
                        $scope.studentList.tableMsgListRecover = [];
                        $scope.state.studentRecoverCount = 0;
                        $scope.studentPaginationRecover.totalItems = 0;
                        // $timeout(function(){
                        //     $scope.state.warningShow = false;
                        // },500)
                    } 
                },function(e){
                    console.log(e)
                });
            }

        },function(e){
            console.log(e)
        })
    }
    //回收头部按钮事件
    $scope.studentRecoverRenew = function(stateAction){
        if(!$scope.studentList.checkboxReArr.length){
            $scope.state.warningShow = true;
            $scope.state.imgNotice = 'img/wonde_big.png';
            $scope.state.noteContent = '请至少选择一项!';
            $timeout(function(){
                $scope.state.warningShow = false;
            },1000)
             return false
        }
        switch(stateAction){
            case 'renew':
                var params = {
                    ids : $scope.studentList.checkboxReArr.join(','),
                    delFlag : 0,
                    updateBy:teachMain.teaId
                }
                $scope.state.imgNotice = 'img/chenggong.png';
                $scope.state.noteContent = '所选用户已成功启用！'; 
            break;
            case 'delet':
                var params = {
                    ids : $scope.studentList.checkboxReArr.join(','),
                    delFlag : 1,
                    updateBy:teachMain.teaId
                }
                $scope.state.imgNotice = 'img/chenggong.png';
                $scope.state.noteContent = '所选用户已彻底删除！';
            break;
        }
        //跟新学生信息
        loginService.teachHandleUpdataList(params,function(res){
            if(res.ret==200){
                $scope.state.warningShow = true;
                $scope.state.studentRecoverChecked = false;
                $scope.studentList.checkboxArr = [];
                $scope.studentList.checkboxStopArr = [];
                $scope.studentList.checkboxReArr = [];
                 var classState = $scope.state.classState=='all'? null:$scope.state.classState;
                loginService.studentHandleUserList({
                    gradeId : $scope.state.gradeState,
                    classId : classState,
                    delFlag:0,
                    state:1,
                    pageNo : 1,
                    pageSize : pageSize
                },function(res){
                    $scope.state.warningShow = false;
                    if(res.ret==200){
                        $scope.studentList.tableMsgList = res.data.list;
                        $scope.studentPaginationOnline.totalItems = res.data.count;
                        $scope.state.studentOnlineCount = res.data.count;
                    }else if(res.ret==400){
                        $scope.studentList.tableMsgList = [];
                        $scope.state.studentOnlineCount = 0;
                        $scope.studentPaginationOnline.totalItems = 0;
                    }
                },function(e){
                    console.log(e)
                });
                //学生停用账号
                loginService.studentHandleUserList({
                    gradeId : $scope.state.gradeState,
                    classId : classState,
                    delFlag:0,
                    state:2,
                    pageNo : 1,
                    pageSize : pageSize
                },function(res){
                    if(res.ret==200){
                        $scope.studentList.tableMsgListStop = res.data.list;
                        $scope.studentPaginationStop.totalItems = res.data.count;
                        $scope.state.studentStopCount = res.data.count;
                    }else if(res.ret==400){
                        $scope.studentList.tableMsgListStop = [];
                        $scope.state.studentStopCount = 0;
                        $scope.studentPaginationStop.totalItems = 0;
                    }
                },function(e){
                    console.log(e)
                });
                //学生回收账号
                loginService.studentHandleUserList({
                    gradeId : $scope.state.gradeState,
                    classId : classState,
                    delFlag:3,
                    pageNo : 1,
                    pageSize : pageSize
                },function(res){
                    if(res.ret==200){
                        $scope.studentList.tableMsgListRecover = res.data.list;
                        $scope.studentPaginationRecover.totalItems = res.data.count;
                        $scope.state.studentRecoverCount = res.data.count;
                    }else if(res.ret==400){
                        // $scope.state.noteContent = '该班级没有学生';
                        // $scope.state.warningShow = true;
                        $scope.studentList.tableMsgListRecover = [];
                        $scope.state.studentRecoverCount = 0;
                        $scope.studentPaginationRecover.totalItems = 0;
                        // $timeout(function(){
                        //     $scope.state.warningShow = false;
                        // },500)
                    } 
                },function(e){
                    console.log(e)
                });

            }
           /* $timeout(function(){
                $scope.state.warningShow = false;
                $state.go('teacher_index.student_handle',null,{reload:true})
            },500)*/

        },function(e){
            console.log(e)
        })
    }
    //点击搜索
    $scope.studentOnlineSearch = function(searchWord){
        var classId = $scope.state.classState=='all'?null:$scope.state.classState;
        if(gradeListStatus==1) {classId = teachMainClassId};
        var params = {
            gradeId : $scope.state.gradeState,
            classId : classId,
            keyword : searchWord,
            delFlag:0,
            state:1,
            pageNo : 1,
            pageSize : pageSize
        };
        if(classId==null){
            $scope.state.warningShow = true;
            $scope.state.imgNotice = 'img/wonde_big.png';
            $scope.state.noteContent = '正在查找!';
        }
        var tableChageItem = sessionStorage.getItem('tableChange');
        if(tableChageItem==null||tableChageItem==0){
            params.state = 1;
            loginService.studentHandleUserList(params,function(res){
                $scope.state.warningShow = false;
                if(res.ret==200){
                    $scope.studentList.tableMsgList = res.data.list;
                    $scope.studentPaginationOnline.totalItems =res.data.count;
                    $scope.state.studentOnlineCount = res.data.count;
                }else if(res.ret==400){
                    $scope.studentList.tableMsgList = [];
                    $scope.state.studentOnlineCount = 0;
                    $scope.studentPaginationOnline.totalItems = 0;
                }
            },function(e){
                console.log(e)
            });
        }else if(tableChageItem == 2){
            params.state = 2;
            loginService.studentHandleUserList(params,function(res){
                $scope.state.warningShow = false;
                if(res.ret==200){
                    $scope.studentList.tableMsgListStop = res.data.list;
                    $scope.studentPaginationStop.totalItems = res.data.count;
                    $scope.state.studentStopCount = res.data.count;
                }else if(res.ret==400){
                    $scope.studentList.tableMsgListStop = [];
                    $scope.state.studentStopCount = 0;
                    $scope.studentPaginationStop.totalItems = 0;
                }
            },function(e){
                console.log(e)
            });
        }else if(tableChageItem == 3){
            params.delFlag = 3;
            params.state = null;
            loginService.studentHandleUserList(params,function(res){
                $scope.state.warningShow = false;
                if(res.ret==200){
                    $scope.studentList.tableMsgListRecover = res.data.list;
                    $scope.studentPaginationRecover.totalItems = res.data.count;
                    $scope.state.studentRecoverCount = res.data.count;
                }else if(res.ret==400){
                    $scope.studentList.tableMsgListRecover = [];
                    $scope.state.studentRecoverCount = 0;
                    $scope.studentPaginationRecover.totalItems = 0;
                }
            },function(e){
                console.log(e)
            });
        }
    }

    $scope.onlineKeyup = function(event,key) {
        if(event.keyCode==13){
            $scope.studentOnlineSearch(key)
        }
    }
    //=学生在线分页组件配置
    $scope.studentPaginationOnline = {
        currentPage: 1,
        totalItems: 1,
        pagesLength: 9,
        itemsPerPage : pageSize,
        perPageOptions: [15],
        onChange:function() {
            var currentpage = this.currentPage;
            var classId = $scope.state.classState=='all'?null:$scope.state.classState;
            var params = {
                gradeId : $scope.state.gradeState,
                classId : classId,
                delFlag:0,
                state : 1,
                pageNo : currentpage,
                pageSize : pageSize
            };
            if(classId==null){
                $scope.state.warningShow = true;
                $scope.state.imgNotice = 'img/wonde_big.png';
                $scope.state.noteContent = '稍等一会!';
            }
            loginService.studentHandleUserList(params,function(res){
                $scope.state.warningShow = false;
                if(res.ret==200){
                	console.log(res.data)
                    $scope.studentList.tableMsgList = res.data.list;
                    // $scope.studentPaginationOnline.totalItems =res.data.count;
                    // $scope.state.studentOnlineCount = res.data.count;
                }else if(res.ret==400){
                    $scope.studentList.tableMsgList = [];
                    $scope.state.studentOnlineCount = 0;
                    $scope.studentPaginationOnline.totalItems = 0;
                }
            },function(e){
                console.log(e)
            });
        }
    }
    //账号停用分页组件配置
    $scope.studentPaginationStop = {
        currentPage: 1,
        totalItems: 1,
        pagesLength: 9,
        itemsPerPage : pageSize,
        perPageOptions: [15],
        onChange:function() {
            var currentpage = this.currentPage;
            var classId = $scope.state.classState=='all'?null:$scope.state.classState;
            var params = {
                gradeId : $scope.state.gradeState,
                classId : classId,
                delFlag:0,
                state:2,
                pageNo : currentpage,
                pageSize : pageSize
            };
            if(classId==null){
                $scope.state.warningShow = true;
                $scope.state.imgNotice = 'img/wonde_big.png';
                $scope.state.noteContent = '稍等一会!';
            }
            loginService.studentHandleUserList(params,function(res){
                $scope.state.warningShow = false;
                if(res.ret==200){
                    $scope.studentList.tableMsgListStop = res.data.list;
                    // $scope.studentPaginationStop.totalItems = res.data.count;
                    // $scope.state.studentStopCount = res.data.count;
                }else if(res.ret==400){
                    $scope.studentList.tableMsgListStop = [];
                    $scope.state.studentStopCount = 0;
                    $scope.studentPaginationStop.totalItems = 0;
                }
            },function(e){
                console.log(e)
            });
        }
    }
    //回收分页组件配置
    $scope.studentPaginationRecover = {
        currentPage: 1,
        // totalItems: 220,
        pagesLength: 9,
        itemsPerPage : pageSize,
        perPageOptions: [15],
        onChange:function() {
            var currentpage = this.currentPage;
            var classId = $scope.state.classState=='all'?null:$scope.state.classState;
            var params = {
                gradeId : $scope.state.gradeState,
                classId : classId,
                delFlag:3,
                pageNo : currentpage,
                pageSize : pageSize
            };
            if(classId==null){
                $scope.state.warningShow = true;
                $scope.state.imgNotice = 'img/wonde_big.png';
                $scope.state.noteContent = '稍等一会!';
            }
            loginService.studentHandleUserList(params,function(res){
                $scope.state.warningShow = false;
                if(res.ret==200){
                    $scope.studentList.tableMsgListRecover = res.data.list;
                    // $scope.studentPaginationRecover.totalItems = res.data.count;
                    // $scope.state.studentRecoverCount = res.data.count;
                }else if(res.ret==400){
                    $scope.studentList.tableMsgListRecover = [];
                    $scope.state.studentRecoverCount = 0;
                    $scope.studentPaginationRecover.totalItems = 0;
                }
            },function(e){
                console.log(e)
            });
        }
    }
}])