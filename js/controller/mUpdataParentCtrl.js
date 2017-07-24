app.controller("mUpdataParentCtrl", ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
    //添加授课单选默认值
    var parentId = $stateParams.parentsCard;
    //获取家长信息
    $http.post(requireIp + '/uc/ucUser/findUserInfoUserId', {
            userId: parentId
            , userType: 3
        }).success(function (res) {
            $scope.realname = res.data.parInfo.realname;
            $scope.userMobile = res.data.parInfo.userMobile;
            $scope.stuInfo = res.data.stuInfo;
        })
        //取子女关系
    $http.get('file/family.json').success(function (res) {
            $scope.family = res.data
        })
        //提交家长信息
    $scope.xgjzxx = function () {
        //姓名空验证
        if ($scope.realname == "" || $scope.realname == undefined) {
            $(".nameerro").show();
            return
        }
        //手机空验证
        if ($scope.userMobile == "" || $scope.userMobile == undefined) {
            $(".shoujierro").show();
            return
        }
        //手机号验证
        var reg = /^((13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8})$/
        if (reg.test($scope.userMobile) == false) {
            $(".shoujihao").show();
            $(".shoujihao .gy_con span").html("请填写正确的手机号");
            setTimeout(function () {
                $(".shoujihao").hide()
            }, 2000);
            return false;
        }
        $scope.uid = parentId
        //获取新的数据
        $scope.parInfo={
            id:$scope.uid,
            realname:$scope.realname,
            userMobile:$scope.userMobile,
        }
        
        $scope.jsonData={
            parInfo:$scope.parInfo,
            stuInfo:$scope.stuInfo
        }
        
        $scope.userObj = {
            jsonData:angular.toJson($scope.jsonData)
        };
        
        $http.post(requireIp + "/uc/ucUser/updateParInfoByTea", $scope.userObj).success(function (res) {
            
            if(res=="200"){
                $(".chenggong").show();
                setTimeout(function () {
                    $(".chenggong").hide();
                    window.location.reload();
                }, 1000)
            }else{
                $(".shoujihao").show();
                $(".shoujihao .gy_con span").html(res.message)
                setTimeout(function () {
                    $(".shoujihao").hide();
                    window.location.reload();
                }, 1000)
            }
            
        })
    }
    $scope.wx_erro = true
    }])