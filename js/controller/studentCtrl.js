app.controller('studentCtrl', ['$scope', 'loginService', '$http', '$stateParams', '$state', function ($scope, loginService, $http, $stateParams,$state) {
    //判断是否为未注册用户，进入注册页面
    if (sessionStorage.getItem('userId') == null) {
        $scope.reg = true;
    }
    //定义区域
    $scope.areaa = {};
    //定义学校类型信息
    $scope.schoolInfo = {};
    //定义所有学校
    $scope.schools = {};
    //定义年级
    $scope.nianjiData={};
    //定义班级
    $scope.banjiData={};
    //获取学校区域
    $http.post(requireIp + '/ea/eaArea/findAreaListByAreaId', {
        areaId: '5d3458f31f5e4cd498b1371cb42ae39a'
    }).success(function (data) {
        $scope.areaa = data.data;
    }).error(function (e) {});
    //获取学校类型
    $http.get('./file/schoolType.json').success(function (res) {
            $scope.schoolInfo = res.data
        })
    //根据区域 查询学校
    $scope.selSchoolArea = function (a) {
            if (a == undefined) {
                $scope.leaderInfo = {
                    "stuLevelId": ""
                    , "gradeName": ""
                    , "gradeId": ""
                    , "stuLevelName": ""
                    , "subjectId": ""
                    , "subjectName": ""
                }
                $scope.user.areaId = null;
                $scope.schools = null;
                $scope.user.schoolId = null;
                $scope.nianjiData=null;
                $scope.banjiData=null;
                $scope.grades = {};
                $scope.classes = {};
                $scope.user.tea_gradeId = null;
                $scope.user.tea_classId = null;
                $scope.user.gradeLeaderGid = null;
            }
            else if ($scope.user.id != null) {
                $scope.leaderInfo = {
                    "stuLevelId": ""
                    , "gradeName": ""
                    , "gradeId": ""
                    , "stuLevelName": ""
                    , "subjectId": ""
                    , "subjectName": ""
                }
                $scope.schools = null;
                $scope.user.schoolId = null;
                $scope.grades = {};
                $scope.classes = {};
                $scope.user.tea_gradeId = null;
                $scope.user.tea_classId = null;
                $scope.user.gradeLeaderGid = null;
                $http.post(requireIp + "/ea/eaOffice/findSchoolInfoByAreaId", {
                    areaId: $scope.user.id
                    , grade: $scope.user.stuLevel
                }).success(function (data) {
                    $scope.schools = data.data;
                });
            }
        }
    //根据学校类型 查询学校(学校类型请选择)
    $scope.selSchoolLevel = function (a) {
            if (a == undefined) {
                $scope.user.stuLevel = null;
                $scope.schools = null;
                $scope.user.schoolId = null;
                $scope.nianjiData=null;
                $scope.banjiData=null;
                $scope.grades = {};
                $scope.classes = {};
                $scope.user.tea_gradeId = null;
                $scope.user.tea_classId = null;
                $scope.user.gradeLeaderGid = null;
            }
            else if ($scope.user.id != null) {
                $scope.leaderInfo = {
                    "stuLevelId": ""
                    , "gradeName": ""
                    , "gradeId": ""
                    , "stuLevelName": ""
                    , "subjectId": ""
                    , "subjectName": ""
                }
                $scope.schools = null;
                $scope.user.schoolId = null;
                $scope.grades = {};
                $scope.classes = {};
                $scope.user.tea_gradeId = null;
                $scope.user.tea_classId = null;
                $scope.user.gradeLeaderGid = null;
                $scope.leaderInfo.stuLevelId = a.id;
                $scope.leaderInfo.stuLevelName = a.name;
                $http.post(requireIp + "/ea/eaOffice/findSchoolInfoByAreaId", {
                    areaId: $scope.user.id
                    , grade: $scope.user.stuLevel
                }).success(function (data) {
                    $scope.schools = data.data;
                });
            }
            else {
                $scope.leaderInfo.stuLevelId = a.id;
                $scope.leaderInfo.stuLevelName = a.name;
            }
        }
    //根据学校id查询年级
    $scope.selGrade = function (a) {
            if (a == undefined) {
                $scope.user.schoolId = null;
                $scope.grades = {};
                $scope.classes = {};
                $scope.nianjiData=null;
                $scope.banjiData=null;
                $scope.user.tea_gradeId = null;
                $scope.user.tea_classId = null;
                $scope.user.gradeLeaderGid = null;
            }
            else {
                $scope.schoolId = a.id
                    //根据学校id查询学校年级
                $http.post(requireIp + '/ea/eaGrade/findGradeInfoByOid', {
                    officeId: $scope.schoolId
                }).success(function (res) {
                    $scope.nianjiData = res.data;
                })
            }
        }
        //根据年级ID查询班级
        $scope.selClass = function (a) {
            if(a== undefined){
                $scope.nianjiData=null;
                $scope.banjiData=null;
            }else if(a==null){
                $scope.nianjiData=null;
                $scope.banjiData=null;
            }else{
                $scope.user.nianjiData=a.gradeId;
                $http.post(requireIp + "/ea/eaClass/findClassInfoByGid", {
                    gradeId: $scope.user.njname
                }).success(function (res) {
                    $scope.banjiData = res.data;
                });
            }
        }
    
    //切换选项卡
    $scope.switch = $stateParams.tableChange;
    $scope.same = 0;
    $scope.tab = function (n) {
            $scope.switch = n
        }
    //定义用户对象
    $scope.user = {};
    $scope.user.data = {};
    //名族对象
    //从session中获取信息
    $scope.user.stuId = sessionStorage.getItem('userId');
    $scope.user.userType = sessionStorage.getItem('userType');
    //调用service层获取数据
    
    //学生注册提交
    $scope.submitzhuceStudentMsg=function(){

        if (!$scope.selected) {
                var yearSub = 0000;
                var monthSub = 00;
                var fulldateSub = 00;
                $scope.user.data.birthday = yearSub + '-' + monthSub + '-' + fulldateSub;
            }
            else if (!$scope.selected2) {
                $(".tijiaosbtc").show();
                $(".tijiaosbtc .gy_con i").html("请选择月份");
                setTimeout(function () {
                    $(".tijiaosbtc").hide();
                }, 1500)
                return;
            }
            else if (!$scope.selected3) {
                $(".tijiaosbtc").show();
                $(".tijiaosbtc .gy_con i").html("请选择日期");
                setTimeout(function () {
                    $(".tijiaosbtc").hide();
                }, 1500)
                return;
            }
            else {
                var yearSub = $scope.selected.name;
                var monthSub = $scope.selected2.name;
                var fulldateSub = $scope.selected3.name;
                yearSub = yearSub.replace('年', '')
                monthSub = monthSub.replace('月', '')
                fulldateSub = fulldateSub.replace('日', '')
                $scope.user.data.birthday = yearSub + '-' + monthSub + '-' + fulldateSub;
                $http.post(requireIp+'/uc/ucUser/studentRegistration',{
                    realname:$scope.user.realname,
                    stuNo:$scope.user.stuNo,
                    sex:$scope.user.sex,
                    userNation:$scope.user.userNation,
                    birthday:$scope.user.data.birthday,
                    officeId:$scope.user.schid,
                    gradeId:$scope.user.njname,
                    classId:$scope.user.bjname
                }).success(function(res){
                    if(res.ret==200){
                        $(".tijiaocgtc").show();
                        $(".tijiaocgtc .gy_con p i").html(res.message);
                        setTimeout(function () {
                            $(".tijiaocgtc").hide();
                        }, 1500)
                    }else{
                        $(".tijiaosbtc").show();
                        $(".tijiaosbtc .gy_con i").html("请选择日期");
                        setTimeout(function () {
                            $(".tijiaosbtc").hide();
                        }, 1500)
                    }
                })
            }
        
    }
    
    
//获取学生信息
    loginService.studentMsg({
            userId: $scope.user.stuId
            , userType: $scope.user.userType
        }, function (res) {
        
        console.log(res)
            $scope.user.id = res.data.stuInfo.id; //学生id
            $scope.user.realname = res.data.stuInfo.realname; //学生姓名
            $scope.user.stuNo = res.data.stuInfo.stuNo; //学生学籍号
            $scope.user.gradeName = res.data.stuInfo.gradeName; //年级名称
            $scope.user.className = res.data.stuInfo.className; //班级名称
            $scope.user.sex = res.data.stuInfo.sex; //性别
            $scope.user.schoolName = res.data.stuInfo.officeName; //学校名称
            $scope.user.userNation = res.data.stuInfo.userNation; //民族
            $scope.user.gradeId = res.data.stuInfo.gradeId;
            $scope.user.classId = res.data.stuInfo.classId;
            $scope.user.schoolId = res.data.stuInfo.officeId;
            $scope.user.img = res.data.stuInfo.userFace;
            $scope.user.data.birthday = res.data.stuInfo.birthday;
            console.log(res.data.stuInfo.birthday)
                //把日期字符串截取成数字格式
            if ($scope.user.data.birthday || $scope.user.data.birthday == '0000-00-00') {
                var year = parseInt($scope.user.data.birthday.substr(0, 4)) + '年';
                var month = parseInt($scope.user.data.birthday.substr(5, 7)) + '月';
                var fulldate = parseInt($scope.user.data.birthday.substr(8, 10)) + '日';
            }
            $scope.selected = (function () {
                if (year) {
                    for (var i = 0; i < listArr.length; i++) {
                        if (year == listArr[i].name) {
                            return listArr[i]
                        }
                    }
                }
            })();
            $scope.selected2 = (function () {
                if ($scope.selected && month) {
                    for (var i = 0; i < $scope.selected.month.length; i++) {
                        if (month == $scope.selected.month[i].name) {
                            return $scope.selected.month[i]
                        }
                    }
                }
            })();
            $scope.selected3 = (function () {
                if ($scope.selected2 && fulldate) {
                    for (var i = 0; i < $scope.selected2.fullDate.length; i++) {
                        if (fulldate == $scope.selected2.fullDate[i].name) {
                            return $scope.selected2.fullDate[i]
                        }
                    }
                }
            })();
        }, function (e) {})
    //获取民族
    $http.get("file/nation.json").success(function (data) {
        $scope.nationData = data.data;
    });
    //日期下拉change
    $scope.selectedChange = function () {
        $scope.selected3 = null;
        $scope.selected2 = null;
    }
    $scope.list = [];
    var currentYear = new Date().getFullYear();
    var ayn = 0;
    var byn = 25;
    for (i = (currentYear + ayn); i > (currentYear - byn); i--) {
        var objYear = {
            "name": i + '年'
            , month: []
        };
        for (var j = 1; j <= 12; j++) {
            var objMonth = {
                "name": j + '月'
                , fullDate: []
            };
            var dPrevDate = new Date(i, j, 0);
            var daysInMonth = dPrevDate.getDate();
            for (var k = 1; k <= parseInt(daysInMonth); k++) {
                var objDate = {
                    "name": k + '日'
                };
                objMonth.fullDate.push(objDate)
            }
            objYear.month.push(objMonth)
        }
        $scope.list.push(objYear)
    };
    var listArr = $scope.list;
    //提交信息
    $scope.submitStudentMsg = function (user) {
            if (!$scope.selected) {
                var yearSub = 0000;
                var monthSub = 00;
                var fulldateSub = 00;
                $scope.user.data.birthday = yearSub + '-' + monthSub + '-' + fulldateSub;
            }
            else if (!$scope.selected2) {
                $(".tijiaosbtc").show();
                $(".tijiaosbtc .gy_con i").html("请选择月份");
                setTimeout(function () {
                    $(".tijiaosbtc").hide();
                }, 1500)
                return;
            }
            else if (!$scope.selected3) {
                $(".tijiaosbtc").show();
                $(".tijiaosbtc .gy_con i").html("请选择日期");
                setTimeout(function () {
                    $(".tijiaosbtc").hide();
                }, 1500)
                return;
            }
            else {
                var yearSub = $scope.selected.name;
                var monthSub = $scope.selected2.name;
                var fulldateSub = $scope.selected3.name;
                yearSub = yearSub.replace('年', '')
                monthSub = monthSub.replace('月', '')
                fulldateSub = fulldateSub.replace('日', '')
                $scope.user.data.birthday = yearSub + '-' + monthSub + '-' + fulldateSub;
            }
            $http.post(requireIp + '/uc/ucUser/updateUserInfo', {
                id: $scope.user.id,
                sex:$scope.user.sex,
                userNation:$scope.user.userNation,
                birthday: $scope.user.data.birthday,
            }).success(function (data) {
                if (data.ret == '200') {
                    $(".tijiaocgtc").show();
                    $(".tijiaocgtc .gy_con p i").html("提交成功");
                    setTimeout(function () {
                        $(".tijiaocgtc").hide();
                        $state.go('login_index.sub_index');
                    }, 1500)
                }else{
                    $(".tijiaosbtc").show();
                    $(".tijiaosbtc .gy_con p i").html("提交失败");
                    setTimeout(function () {
                        $(".tijiaosbtc").hide();
                        $state.go('login_index.sub_index');
                    }, 1500)
                }
            }).error(function (e) {});
        }
    
    //头像截取上传功能
    $scope.myImage = '';
    $scope.myCroppedImage = '';
    var handleFileSelect = function (evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function ($scope) {
                $scope.myImage = evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
    //base64转换图片
    /**
     * 将以base64的图片url数据转换为Blob
     * @param urlData
     * 用url方式表示的base64图片数据
     */
    function convertBase64UrlToBlob(dataURI){
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {
            type: mimeString
        });
    }
    //图片上传
    $scope.upload = function () {
            var fd = new FormData(); 
            fd.append("filename",convertBase64UrlToBlob($scope.myCroppedImage),"image.jpg");
            fd.append("id", $scope.user.id);
            $.ajax({
                url : requireIp + "/uc/ucUser/uploadUserFace",
                type : "POST",
                data : fd,
                dataType:"text",
                processData : false,
                contentType : false,
                success:function(data){
                },
                xhr:function(){
                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function(evt){
                        if (evt.lengthComputable) {
                            var percentComplete = Math.round(evt.loaded * 100 / evt.total); 
                            $(".tijiaocgtc").show();
                            $(".tijiaocgtc .gy_con p i").html("头像上传成功！");
                            setTimeout(function () {
                                $(".tijiaocgtc").hide();
                                $state.go('login_index.sub_index');
                            }, 1500)

                            console.log("正在提交."+percentComplete.toString() + '%'); 
                        }
                    }, false);
                    return xhr;
                }
            });
        }
        //修改密码
    $scope.updateStudentMsg = function (user) {
        if ($scope.user.newpassword == "" || $scope.user.newpassword == null) {
            $scope.same = 3;
        }
        else if ($scope.user.newpassword.length < 6) {
            $scope.same = 3;
        }
        else if ($scope.user.newpassword != $scope.user.renewpassword) {
            $scope.same = 1;
        }
        else {
            $scope.same = 0
                //提交
            var fd = new FormData();
            fd.append("id", $scope.user.stuId);
            console.log($scope.user.stuId)
            console.log($scope.user.newpassword)
            fd.append("password", $scope.user.newpassword);
            $http({
                method: 'POST'
                , url: requireIp + "/uc/ucUser/updatePassword"
                , data: fd
                , headers: {
                    'Content-Type': undefined
                }
                , transformRequest: angular.identity
            }).success(function (res) {
                if (res.ret == "200") {
                    $(".tijiaocgtc").show();
                    $(".tijiaocgtc .gy_con p i").html("提交成功");
                    sessionStorage.clear();
                    setTimeout(function () {
                        $(".tijiaocgtc").hide();
                        $state.go('login_index.sub_index');
                    }, 1500);
                }
                else if (res.message == "原始密码校验失败!") {
                    $scope.same = 4
                }
                else {
                    $(".tijiaosbtc").show();
                    $(".tijiaosbtc .gy_con p i").html(res.message);
                    setTimeout(function () {
                        $(".tijiaosbtc").hide();
                    }, 1500)
                }
            })
        }
    }
}])
$(function () {
    $("#file").change(function (e) {
        var f = document.getElementById('file').files[0];
        var src = window.URL.createObjectURL(f);
        document.getElementById('preview').src = src;
    });
})