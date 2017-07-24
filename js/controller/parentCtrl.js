app.controller('parentCtrl', ['$scope', '$http', '$stateParams', '$state', function ($scope, $http, $stateParams, $state) {
    //判断是否为未注册用户,进入注册模式
    if (sessionStorage.getItem("userId") == null) {
        $scope.reg = true;
    }
    //切换
    $scope.switch = $stateParams.tableChange;
    $scope.zinvshow = 0;
    $scope.tab = function (n) {
        $scope.switch = n
    }
    $scope.zinvtab = function (n) {
            $scope.zinvshow = n
        }
        //定义user对象
    $scope.user = {};
    //定义会显得user对象
    $scope.huixianuser = {};
    //定义民族
    $scope.nationData = {};
    //定义子女数组
    $scope.znlist = [];
    //定义查询的家长对象
    $scope.userObj = {
        user_nation: ""
        , uid: ""
        , user_email: ""
        , user_mobile: ""
        , sex: ""
        , state: ""
        , stuName: ""
        , stuNo: ""
        , realname: ""
        , id: ""
        , userType: ""
    };
    
    $scope.userType=sessionStorage.getItem("userType")
    //民族下拉列表,访问静态文件
    $http.get("file/nation.json").success(function (data) {
        $scope.nationData = data.data;
    });
    //子女关系,访问静态文件
    $http.get("file/family.json").success(function (res) {
        $scope.family = res.data;
    });
    //从session中获取参数
    $scope.user.id = sessionStorage.getItem('userId');
    $scope.user.userType = sessionStorage.getItem('userType');
    //通过id查询用户信息
    $http.post(requireIp + "/uc/ucUser/findUserInfoUserId", {
        userId: $scope.user.id,
        userType:3
    }).success(function (data) {
        $scope.user = data.data.parInfo;
        $scope.user.img = data.data.parInfo.userFace;
        $scope.userObj.id = sessionStorage.getItem('userId');
        $scope.userObj.realname = data.data.parInfo.realname;
        $scope.userObj.sex = data.data.parInfo.sex;
        $scope.userObj.state = $scope.user.state;
        $scope.userObj.stuName = data.data.parInfo.stuName;
        $scope.userObj.stuNo = $scope.user.stuNo;
        $scope.userObj.uid = $scope.user.uid;
        $scope.userObj.userType = sessionStorage.getItem('userType');
        $scope.user.user_nation = data.data.parInfo.userNation;
        $scope.user.user_mobile = data.data.parInfo.userMobile;
        $scope.user.user_email = data.data.parInfo.userEmail;
        
        
        //页面加载子女信息
        $scope.znlist = data.data.stuInfo;
        angular.forEach($scope.znlist, function (p) {
            $scope.gx = p.relationId
            var keepGoing = true;
            $scope.childrenObj.schoolName = p.officeName;
            angular.forEach($scope.nationData, function (data) {
                if (keepGoing) {
                    if (data.id == p.userNation) {
                        p.userNation = data.name;
                        keepGoing = false;
                    }
                }
            });
        });
        
        
    });
    

    //家长注册提交
    $scope.submitzhuceParent = function () {
            console.log($scope.user.user_mobile)
            $http.post(requireIp +'/uc/ucUser/addParent', {
                realname: $scope.user.realname
                , sex: $scope.user.sex
                , userNation: $scope.user.user_nation
                , userMobile: $scope.user.user_mobile
                , userEmail: $scope.user.user_email
                , stuName: $scope.user.stuName
                , stuNo: $scope.user.stuNo
            }).success(function (res) {
                if (res.ret == 200) {
                    $(".tijiaocgtc").show();
                    $(".tijiaocgtc .gy_con p i").html(res.message);
                    setTimeout(function () {
                        $(".tijiaocgtc").hide();
                        $state.go('login_index.sub_index', {
                            'tableChange': 1
                        });
                        sessionStorage.clear();
                    }, 1500)
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
        //家长点击个人信息的提交
    $scope.submitDataParent = function () {
            $scope.user.id = sessionStorage.getItem('userId');
            $scope.user.userType = sessionStorage.getItem('userType');
            if ($scope.user.realname == "" || $scope.user.sex == "" || $scope.user.user_nation == "") {
                $(".tijiaosbtc").show();
                $(".tijiaosbtc .gy_con p i").html("请填写完整的信息再提交");
                setTimeout(function () {
                    $(".tijiaosbtc").hide();
                }, 1500)
                return;
            }
            //手机号验证
            var reg = /^((13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8})$/
            if (reg.test($scope.user.user_mobile) == false || $scope.user.user_mobile == "") {
                $(".tijiaosbtc").show();
                $(".tijiaosbtc .gy_con p i").html("请填写正确的手机号");
                setTimeout(function () {
                    $(".tijiaosbtc").hide();
                }, 1500)
                return;
            }
            //邮箱验证
            var youxiang = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if (youxiang.test($scope.user.user_email) == false || $scope.user.user_email == "") {
                $(".tijiaosbtc").show();
                $(".tijiaosbtc .gy_con p i").html("请填写正确的邮箱");
                setTimeout(function () {
                    $(".tijiaosbtc").hide();
                }, 1500)
                return;
            }
            if (JSON.stringify($scope.userObj) == JSON.stringify($scope.user)) {
                $(".tijiaosbtc").show();
                $(".tijiaosbtc .gy_con p i").html("请操作后再提交");
            }
            else {
                $http.post(requireIp + "/uc/ucUser/updateUserInfo", {
                    id: $scope.user.id
                    , realname: $scope.user.realname
                    , sex: $scope.user.sex
                    , userNation: $scope.user.user_nation
                    , userMobile: $scope.user.user_mobile
                    , userEmail: $scope.user.user_email
                }).success(function (data) {
                    if (data.ret == "200") {
                        $(".tijiaocgtc").show();
                        $(".tijiaocgtc .gy_con p i").html("提交成功");
                        setTimeout(function () {
                            $(".tijiaocgtc").hide();
                            $state.go('login_index.sub_index');
                        }, 1500)
                    }
                    else {
                        $(".tijiaosbtc").show();
                        $(".tijiaosbtc .gy_con p i").html("提交出错");
                        setTimeout(function () {
                            $(".tijiaosbtc").hide();
                            $state.go('login_index.sub_index');
                        }, 1500)
                    }
                });
            }
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
    function convertBase64UrlToBlob(dataURI) {
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);
        else byteString = unescape(dataURI.split(',')[1]);
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
    $scope.upload = function (e) {
            var fd = new FormData();
            fd.append("filename", convertBase64UrlToBlob($scope.myCroppedImage), "image.jpg");
            fd.append("id", e.id);
            $.ajax({
                url: requireIp + "/uc/ucUser/uploadUserFace"
                , type: "POST"
                , data: fd
                , dataType: "text"
                , processData: false
                , contentType: false
                , success: function (data) {}
                , xhr: function () {
                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                            $(".tijiaocgtc").show();
                            $(".tijiaocgtc .gy_con p i").html("头像上传成功！");
                            setTimeout(function () {
                                $(".tijiaocgtc").hide();
                                $state.go('login_index.sub_index');
                            }, 1500)
                            console.log("正在提交." + percentComplete.toString() + '%');
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
                fd.append("id", $scope.user.id);
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
        //子女信息提交
    $scope.zvsubmit = function () {
        //定义子女提交对象
        $http.post(requireIp + "/uc/ucUser/updateRelation", {
            parId: $scope.user.id
            , stuId: $scope.znlist[0].id
            , relationId: $scope.znlist[0].relationId
        }).success(function (data) {
            if (data.ret == "200") {
                console.log(data)
                $(".tijiaocgtc").show();
                $(".tijiaocgtc .gy_con p i").html("提交成功");
                setTimeout(function () {
                    $(".tijiaocgtc").hide();
                }, 1000)
            }
            else {
                $(".tijiaocgtc").show();
                $(".tijiaocgtc .gy_con p i").html("提交成功");
                setTimeout(function () {
                    $(".tijiaocgtc").hide();
                }, 1000)
            }
        });
    }
}]);
app.filter("sexnanfilter", function () {
    return function (sex) {
        return "zinan" + sex;
    }
});
app.filter("sexnvfilter", function () {
    return function (sex) {
        return "zinv" + sex;
    }
});
$(function () {
    $("#file").change(function (e) {
        var f = document.getElementById('file').files[0];
        var src = window.URL.createObjectURL(f);
        document.getElementById('preview').src = src;
    });
})