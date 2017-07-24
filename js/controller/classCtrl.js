 app.controller('classCtrl', ['$scope', '$http', function ($scope, $http) {
     $scope.subBox = false;
     //ajax获取学校信息 查出年级和班级
     var schoolId = {
         officeId: JSON.parse(sessionStorage.getItem('userObj')).oid
     }
     
     $http.post(requireIp + '/ea/eaClass/findClassAndGradeByOfficeId', schoolId).success(function (res) {
             $scope.xuexiao = res;
     })
         //鼠标移入班级出现叉号
     $scope.banjiguanli = function (n) {
             $scope.delbanji = n;
         }
         //点击编辑班级名称
     $scope.bianjiname = function (event) {
             //原来的班级名称
             $scope.oldbjmc = angular.element(event.target).html();
             angular.element(event.target).html('<input type="text" value="' + $scope.oldbjmc + '" />')
                 //失去焦点的时候获取新的名称
             angular.element(event.target).children().blur(function () {
                 //获取新的班级名称
                 $scope.newbjmc = angular.element(event.target).children().val();
                 //获取班级ID
                 $scope.bjid = angular.element(event.target).siblings("p").html()
                 $http.post(requireIp + '/ea/eaClass/updateClassInGrade', {
                     classId: $scope.bjid
                     , className: $scope.newbjmc
                 }).success(function (res) {
                     $(".zy_warningBox").show();
                     $(".zy_warningBox .gy_con i").html("修改成功")
                     setTimeout(function () {
                         $(".zy_warningBox").hide()
                     }, 1000)
                 })
             })
         }
         //点击叉号出现弹窗
     $scope.deltc = function (event) {
             $(".zy_addClassBox").show()
                 //确认删除弹窗
             $scope.suredel = function () {
                     angular.element(event.target).parent().addClass("wx_none"); //点击确定按钮，让当前选中的班级消失
                     $(".zy_addClassBox").hide()
                 }
                 //取消删除弹窗
             $scope.caldel = function () {
                     $(".zy_addClassBox").hide()
                     $scope.delbanji = false;
                 }
                 //点击确定删除班级
             $scope.suredel = function () {
                 $scope.delbjid = angular.element(event.target).siblings("p").html();
                 console.log($scope.delbjid)
                 $http.post(requireIp + '/ea/eaClass/delClassById', {
                     id: $scope.delbjid
                 }).success(function (res) {
                     $(".zy_warningBox").show();
                     $(".zy_addClassBox").hide()
                     setTimeout(function () {
                         $(".zy_warningBox").hide();
                     }, 1000)
                     angular.element(event.target).parent().addClass("wx_none");
                 })
             }
         }
         //点击叉号，关闭弹窗
     $scope.gbtc = function () {
             $(".zy_addClassBox").hide()
             $scope.delbanji = false;
         }
         //点击+号 添加班级
     $scope.tjbanji = function (event) {
         angular.element(event.target).addClass("wx_none").siblings("span").removeClass("wx_none");
         $scope.baocun = function (event) {
             //获取年级ID
             $scope.gradeId = angular.element(event.target).parent().find("em").html();
             //获取班级名称
             $scope.className = angular.element(event.target).siblings("span.wx_ycsrk").children("input").val();
             if ($scope.className == "") {
                 $(".wx_erro_tc").show();
                 $(".wx_erro_tc .gy_con span").html("请输入班级名称");
                 setTimeout(function () {
                     $(".wx_erro_tc").hide();
                 }, 2000)
             }
             else {
                 //通过后台接口添加班级
                 $http.post(requireIp + "/ea/eaClass/insertClassInGrade", {
                     gradeId: $scope.gradeId
                     , className: $scope.className
                 }).success(function (res) {
                     if (res.ret == '200') {
                         $(".zy_warningBox").show();
                         $(".zy_warningBox .gy_con i").html("添加成功");
                         setTimeout(function () {
                             window.location.reload();
                         }, 1500)
                     }
                     else {
                         $(".wx_erro_tc").show();
                         $(".wx_erro_tc .gy_con span").html(res.message);
                         setTimeout(function () {
                             $(".wx_erro_tc").hide();
                         }, 2000)
                     }
                 }).error(function (res) {
                     console.log(res)
                 })
             }
         }
         $scope.fangqi = function (event) {
             angular.element(event.target).addClass("wx_none").siblings("span").addClass("wx_none").siblings("span.add").removeClass("wx_none");
         }
     }
    }])