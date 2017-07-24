 var app = angular.module('app',['ui.router','oc.lazyLoad','ngImgCrop']);

 app.run(['$rootScope','$location',function($rootScope,$location) {
	$rootScope.$on('$locationChangeSuccess',function(a,b,fromState) {
        // if(fromState.substr(fromState.indexOf('#')+1) == '/teacher_index/student_handle'|| fromState.substr(fromState.indexOf('#')+1)=='/teacher_index/parents_handle'){
        //     console.log('leave')
        //     sessionStorage.removeItem('tableChange')
        // }
        window.scrollTo(0,0);
	});
 }]);
app.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider","$httpProvider","$locationProvider",
    function ($provide, $compileProvider, $controllerProvider, $filterProvider,$httpProvider,$locationProvider) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
//转化post请求传参-------------------------------------------------
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
	  	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	  	$httpProvider.defaults.transformRequest = [function(data) {
    	var param = function(obj) {
      	var query = '';
		var name, value, fullSubName, subName, subValue, innerObj, i;
		for(name in obj) {
			value = obj[name];
			if(value instanceof Array) {
				for(i = 0; i < value.length; ++i) {
					subValue = value[i];
					fullSubName = name + '[' + i + ']';
					innerObj = {};
					innerObj[fullSubName] = subValue;
					query += param(innerObj) + '&';
				}
			} else if(value instanceof Object) {
				for(subName in value) {
					subValue = value[subName];
					fullSubName = name + '[' + subName + ']';
					innerObj = {};
					innerObj[fullSubName] = subValue;
					query += param(innerObj) + '&';
				}
			} else if(value !== undefined && value !== null) {
				query += encodeURIComponent(name) + '=' +
					encodeURIComponent(value) + '&';
			}
		}
		return query.length ? query.substr(0, query.length - 1) : query;
		};
	    return angular.isObject(data) && String(data) !== '[object File]'
	        ? param(data)
	        : data;
	  	}];
   //转化post请求传参------------------------------------------------------
}]);
 
 app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login_index/login_sub_index');
    $stateProvider
    .state('login_index',{//跳转到云空间首页
        url: "/login_index",
        templateUrl : 'tpl/login_index.html',
        controller:"indexCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/indexCtrl.js");
            }]
        }
    })
    .state('login_index.sub_index',{//首页的内嵌二级页面
    	url:'/login_sub_index',
    	templateUrl : 'tpl/login/login_sub_index.html',
    	controller:"loginIndexCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/user_login.js");
            }]
        }
    })
    .state('login_index.resource_index',{//首页的资源页面
    	url:'/login_resource_index',
    	templateUrl:'tpl/login/login_resource_index.html'
    })
    .state('register_page',{//纯注册页面
    	url:'/register_page',
        params:{
            'tableChange':0
        },
    	templateUrl:'tpl/login/register_page.html',
    	cache:true,
  		controller:'registerIndexCtrl',
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/user_register.js");
            }]
        }
    })
    .state('login_page',{//纯登陆页面
        url: "/login_page",
        templateUrl : 'tpl/login/login_page.html',
        controller:'loginIndexCtrl',
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/user_login.js");
            }]
        }
    })
    .state('teacher_index',{//教师用户中心首页
    	url:'/teacher_index',
    	templateUrl:'tpl/userCenter/teacher_index.html',
    })
    .state('teacher_index.teacher_center',{//教师用户中心的一级页面
    	url:'/teacher_center',
    	templateUrl:'tpl/userCenter/teacher_center.html',
		controller:'teacherCenCtr',
		resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/teacher_index.js");
            }]
        }
    })
    .state('teacher_index.teacher_personal',{//教师用户中心的个人信息页
    	url:'/teacher_personal',
        params:{
            'tableChange':0,
            'teachId':null
        },
    	templateUrl:'tpl/userCenter/teacher_personal.html',
    	controller:'teacherCtrinF',
    	resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/teacher_center.js");
            }]
        }
    })
    .state('teacher_index.parent_center',{//家长用户中心的个人信息页
    	url:'/parent_center',
        params:{
            'tableChange':0
        },
    	templateUrl:'tpl/userCenter/parent_center.html',
    	controller:'parentCtrl',
    	resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/parentCtrl.js");
            }]
        }
    })
    .state('teacher_index.teach_lessons',{//教师授课管理页面
    	url:'/teach_lessons',
    	templateUrl:'tpl/userCenter/teach_lessons.html',
    	controller:'lessonCtrl',
    	resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/lessonCtrl.js");
            }]
        }
    })
    .state('teacher_index.teach_handle',{//教师管理页面
    	url:'/teach_handle',
        params:{
            'tableChange':0
        },
    	templateUrl:'tpl/userCenter/teach_handle.html',
    	controller:'teachHandleCtrl',
    	resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/teachHandleCtrl.js");
            }]
        }
    })
     .state('teacher_index.student_personal',{//学生个人中心页面
    	url:'/student_personal',
        params:{
            'tableChange':0
        },
    	templateUrl:'tpl/userCenter/student_personal.html',
    	controller:'studentCtrl',
    	resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/studentCtrl.js");
            }]
        }
    })
     .state('teacher_index.student_handle',{//学生管理页面
    	url:'/student_handle',
    	templateUrl:'tpl/userCenter/student_handle.html',
    	controller:'studentHandleCtrl',
    	resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/studentHandleCtrl.js");
            }]
        }
    })
    .state('teacher_index.parents_handle',{//家长管理页面
    	url:'/parents_handle',
    	templateUrl:'tpl/userCenter/parents_handle.html',
    	controller:'parentsHandleCtrl',
    	resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/parentsHandleCtrl.js");
            }]
        }
    })
    .state('teacher_index.manager_updataParent',{//家长信息修改 管理者
    	url:'/manager_updataParent',
        params:{
            'parentsCard':null
        },
    	templateUrl:'tpl/userCenter/manager_updataparent.html',
    	controller:'mUpdataParentCtrl',
    	resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/mUpdataParentCtrl.js");
            }]
        }
    })
    .state('teacher_index.manager_updataStudent',{//学生信息修改 管理者
    	url:'/manager_updataStudent',
        params:{
            'studentCard':null
        },
    	templateUrl:'tpl/userCenter/manager_updatastudent.html',
    	controller:'mUpdataStudentCtrl',
    	resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/mUpdataStudentCtrl.js");
            }]
        }
    })
    .state('teacher_index.teacher_updataStudent',{//学生信息修改 班主任
    	url:'/teacher_updataStudent',
        params:{
            'studentCard':null
        },
    	templateUrl:'tpl/userCenter/teacher_updatastudent.html',
    	controller:'tUpdataStudentCtrl',
    	resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/tUpdataStudentCtrl.js");
            }]
        }
    })
    .state('teacher_index.manager_school',{//学校信息修改
    	url:'/manager_school',
    	templateUrl:'tpl/userCenter/manager_school.html',
    	controller:'managerSchoolCtr',
    	resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/manager_admin.js");
            }]
        }
    })
    .state('teacher_index.manager_class',{//班级管理
    	url:'/manager_class',
    	templateUrl:'tpl/userCenter/manager_class.html',
    	controller:'classCtrl',
    	resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/classCtrl.js");
            }]
        }
    })
    .state('teacher_index.find_password',{//找回密码
    	url:'/password_zhaohui',
    	templateUrl:'tpl/userCenter/password_zhaohui.html',
    	params:{
            'status':0
        },
    	controller:'findPassword',
    	resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/findPassword.js");
            }]
        }
    })
    .state('teacher_index.reset_password',{//找回密码重置
    	url:'/reset_password',
    	templateUrl:'tpl/userCenter/reset_password.html',
    	controller:'resetPassword',
    	resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load("js/controller/resetPassword.js");
            }]
        }
    })
    .state('teacher_index.password_success',{//修改密码成功
    	url:'/password_success',
    	templateUrl:'tpl/userCenter/password_success.html',
    	controller:'resetPasswordSucc'
    })
}])
 
//教师用户中心一级页面的控制器
//app.controller('indexCtrl',['$scope',function($scope){}])
//图片加载失败替换
app.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});

//分页组件
app.directive('zjyPagination',function(){
    return {
        restrict: 'EA',
        template: '<div class="page-list">' +
            '<ul class="handle_paging" ng-show="conf.totalItems > 0">' +
            '<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><span class="laquoPrev"></span></li>' +
            '<li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ' +
            'ng-click="changeCurrentPage(item)">' +
            '<span>{{ item }}</span>' +
            '</li>' +
            '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><span></span></li>' +
            '</ul>' +
            '<div class="no-items" ng-show="conf.totalItems <= 0">暂无数据</div>' +
            '</div>',
        replace: true,
        scope: {
            conf: '='
        },
        link: function(scope, element, attrs) {
            var conf = scope.conf;
            var defaultPagesLength = 9;
            var defaultPerPageOptions = [5, 10, 15, 20, 30, 50];
            var defaultPerPage = 5;
            if(conf.pagesLength) {
                // 判断一下分页长度
                conf.pagesLength = parseInt(conf.pagesLength, 10);
                if(!conf.pagesLength) {
                    conf.pagesLength = defaultPagesLength;
                }
                // 分页长度必须为奇数，如果传偶数时，自动处理
                if(conf.pagesLength % 2 === 0) {
                    conf.pagesLength += 1;
                }
            } else {
                conf.pagesLength = defaultPagesLength
            }
            // 分页选项可调整每页显示的条数
            if(!conf.perPageOptions){
                conf.perPageOptions = defaultPagesLength;
            }
            // pageList数组
            function getPagination(newValue, oldValue) {
                // conf.currentPage
                if(conf.currentPage) {
                    conf.currentPage = parseInt(scope.conf.currentPage, 10);
                }
                if(!conf.currentPage) {
                    conf.currentPage = 1;
                }
                // conf.totalItems
                if(conf.totalItems) {
                    conf.totalItems = parseInt(conf.totalItems, 10);
                }
                // conf.totalItems
                if(!conf.totalItems) {
                    conf.totalItems = 0;
                    return;
                }
                if(conf.itemsPerPage) {
                    conf.itemsPerPage = parseInt(conf.itemsPerPage, 10);
                }
                if(!conf.itemsPerPage) {
                    conf.itemsPerPage = defaultPerPage;
                }
                conf.numberOfPages = Math.ceil(conf.totalItems/conf.itemsPerPage);
                // 如果分页总数>0，并且当前页大于分页总数
                if(scope.conf.numberOfPages > 0 && scope.conf.currentPage > scope.conf.numberOfPages){
                    scope.conf.currentPage = scope.conf.numberOfPages;
                }
                // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                var perPageOptionsLength = scope.conf.perPageOptions.length;
                // 定义状态
                var perPageOptionsStatus;
                for(var i = 0; i < perPageOptionsLength; i++){
                    if(conf.perPageOptions[i] == conf.itemsPerPage){
                        perPageOptionsStatus = true;
                    }
                }
                // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                if(!perPageOptionsStatus){
                    conf.perPageOptions.push(conf.itemsPerPage);
                }
                // 对选项进行sort
                conf.perPageOptions.sort(function(a, b) {return a - b});
                // 页码相关
                scope.pageList = [];
                if(conf.numberOfPages <= conf.pagesLength){
                    // 判断总页数如果小于等于分页的长度，若小于则直接显示
                    for(i =1; i <= conf.numberOfPages; i++){
                        scope.pageList.push(i);
                    }
                }else{
                    // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                    // 计算中心偏移量
                    var offset = (conf.pagesLength - 1) / 2;
                    if(conf.currentPage <= offset){
                        // 左边没有...
                        for(i = 1; i <= offset + 1; i++){
                            scope.pageList.push(i);
                        }
                        scope.pageList.push('...');
                        scope.pageList.push(conf.numberOfPages);
                    }else if(conf.currentPage > conf.numberOfPages - offset){
                        scope.pageList.push(1);
                        scope.pageList.push('...');
                        for(i = offset + 1; i >= 1; i--){
                            scope.pageList.push(conf.numberOfPages - i);
                        }
                        scope.pageList.push(conf.numberOfPages);
                    }else{
                        // 最后一种情况，两边都有...
                        scope.pageList.push(1);
                        scope.pageList.push('...');

                        for(i = Math.ceil(offset / 2) ; i >= 1; i--){
                            scope.pageList.push(conf.currentPage - i);
                        }
                        scope.pageList.push(conf.currentPage);
                        for(i = 1; i <= offset / 2; i++){
                            scope.pageList.push(conf.currentPage + i);
                        }

                        scope.pageList.push('...');
                        scope.pageList.push(conf.numberOfPages);
                    }
                }
                scope.$parent.conf = conf;
            }
            scope.prevPage = function() {
                if(conf.currentPage==1){
                    return false;
                }
                if(conf.currentPage > 1){
                    conf.currentPage -= 1;
                }
                getPagination();
                if(conf.onChange) {
                    conf.onChange();
                }
            };
            // nextPage
            scope.nextPage = function() {
                if(conf.currentPage==conf.numberOfPages){
                    return false;
                }
                if(conf.currentPage < conf.numberOfPages){
                    conf.currentPage += 1;
                }
                getPagination();
                if(conf.onChange) {
                    conf.onChange();
                }
            };
            // 变更当前页
            scope.changeCurrentPage = function(item) {
                if(item == '...'){
                    return;
                }else{
                    if(conf.currentPage==item){
                        return;
                    }
                    conf.currentPage = item;
                    getPagination();
                    // conf.onChange()函数
                    if(conf.onChange) {    
                        conf.onChange(item);
                    }
                }
            };
            // 修改每页展示的条数
            scope.changeItemsPerPage = function() {
                // 一发展示条数变更，当前页将重置为1
                conf.currentPage = 1;
                getPagination();
                // conf.onChange()函数
                if(conf.onChange) {    
                    conf.onChange();
                }
            };
            // 跳转页
            scope.jumpToPage = function() {
                num = scope.jumpPageNum;
                if(num.match(/\d+/)) {
                    num = parseInt(num, 10);
                    if(num && num != conf.currentPage) {
                        if(num > conf.numberOfPages) {
                            num = conf.numberOfPages;
                        }
                        // 跳转
                        conf.currentPage = num;
                        getPagination();
                        // conf.onChange()函数
                        if(conf.onChange) {    
                            conf.onChange();
                        }
                        scope.jumpPageNum = '';
                    }
                }
            };
            scope.jumpPageKeyUp = function(e) {
                var keycode = window.event ? e.keyCode :e.which;
                if(keycode == 13) {
                    scope.jumpToPage();
                }
            }
            scope.$watch('conf.totalItems', function(value, oldValue) {
                // 在无值或值相等的时候，去执行onChange事件
                if(!value || value == oldValue) {
                    if(conf.onChange) {    
                        // conf.onChange();
                    }
                }
                getPagination();
            })
        }
    }
});