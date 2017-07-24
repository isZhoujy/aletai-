app.controller("mUpdataStudentCtrl", ['$scope', '$http', '$stateParams', 'loginService', function ($scope, $http, $stateParams, loginService) {
    $scope.user = {}
    //从session中取用户id和用户类型和学校id
    $scope.user.uid = $stateParams.studentCard; //用户id

    $scope.user.userType = 2; //用户类型
    var schoolId = {
            id: JSON.parse(sessionStorage.getItem('userObj')).oid
        }
        //根据学校id查询学校年级
    $http.post(requireIp + '/ea/eaGrade/findGradeInfoByOid', {
            officeId: schoolId.id
        }).success(function (res) {
            $scope.nianjiData = res.data;
     })
    
    $scope.selClass = function () {
            $http.post(requireIp + "/ea/eaClass/findClassInfoByGid", {
                gradeId: $scope.user.nianjiData
            }).success(function (res) {
                $scope.banjiData = res.data;
                console.log($scope.banjiData)
            });
        }
        //获取民族
    $http.get("file/nation.json").success(function (data) {
        $scope.nationData = data.data;
    });
    
    //日期下拉change
    $scope.selectedChange = function(){
        $scope.selected3 = null;
        $scope.selected2 = null;
    }
    $scope.list = [];
    var currentYear = new Date().getFullYear();
    var ayn = 0;
    var byn = 25;
    for(i=(currentYear+ayn);i>(currentYear-byn);i--){
        var objYear = {"name":i+'年',month:[]};
        for(var j=1;j<=12;j++){
            var objMonth = {"name":j+'月',fullDate:[]};
            var dPrevDate = new Date(i,j,0);
            var daysInMonth=dPrevDate.getDate();
            for(var k=1;k<=parseInt(daysInMonth);k++){
                var objDate = {"name":k+'日'};
                objMonth.fullDate.push(objDate)
            }
            objYear.month.push(objMonth)
        }
        $scope.list.push(objYear)
    };
    var listArr = $scope.list;
    
    //查询学生信息
    loginService.studentMsg({
        userId: $scope.user.uid
        , userType: $scope.user.userType
    }, function (res) {
        $scope.user = res.data.stuInfo;
        $scope.user.nianjiData = res.data.stuInfo.gradeId;
        $scope.user.banjiData = res.data.stuInfo.classId;
        $scope.scoolName=res.data.stuInfo.officeName;
        $scope.realname=res.data.stuInfo.realname;
        $scope.stuNo=res.data.stuInfo.stuNo;
        $scope.sex=res.data.stuInfo.sex;
        $scope.userNation=res.data.stuInfo.userNation;
        $scope.birthday=res.data.stuInfo.birthday;
       //把日期字符串截取成数字格式
            if ($scope.birthday || $scope.birthday == '0000-00-00') {
                var year = parseInt($scope.birthday.substr(0, 4)) + '年';
                var month = parseInt($scope.birthday.substr(5, 7)) + '月';
                var fulldate = parseInt($scope.birthday.substr(8, 10)) + '日';
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
 
        //根据年级id查询学校年级
        $http.post(requireIp + "/ea/eaClass/findClassInfoByGid", {
            gradeId: $scope.user.nianjiData
        }).success(function (res) {
            $scope.banjiData = res.data;
        });
    }, function (e) {});
    
    //修改学生信息
    $scope.xgxsxx = function () {
            if (!$scope.selected) {
                var yearSub = 0000;
                var monthSub = 00;
                var fulldateSub = 00;
                $scope.birthday = yearSub + '-' + monthSub + '-' + fulldateSub;
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
                $scope.birthday = yearSub + '-' + monthSub + '-' + fulldateSub;
            }
            
            console.log($scope.user.id)
            console.log($scope.user.banjiData)
            $http.post(requireIp + '/uc/ucUser/updateStuInfoByTea', {
                id:$scope.user.id
                , stuNo: $scope.stuNo
                , realname: $scope.realname
                , sex: $scope.sex
                , classId: $scope.user.banjiData
                , gradeId: $scope.user.nianjiData
                , userNation: $scope.userNation
                , birthday: $scope.birthday
            }).success(function (res) {
                if (res.ret = '200') {
                    $(".tijiaocgtc").show();
                    $(".tijiaocgtc .gy_con i").html("提交成功")
                    setTimeout(function () {
                        $(".tijiaocgtc").hide();
                    }, 1000)
                }else{
                     $(".tijiaosbtc").show();
                    $(".tijiaosbtc .gy_con i").html(res.message);
                    setTimeout(function () {
                        $(".tijiaosbtc").hide();
                    }, 1500)
                }
            }).error(function (e) {
                $(".tijiaosbtc").show();
                    $(".tijiaosbtc .gy_con i").html("提交失败")
                    setTimeout(function () {
                        $(".tijiaosbtc").hide();
                    }, 1000)
            })
        }
}])