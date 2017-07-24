	/*app.config(["$provide", function($provide) {
		//日历汉化
		var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
		$provide.value("$locale", {
		  "DATETIME_FORMATS": {
		    "AMPMS": [
		      "\u4e0a\u5348",
		      "\u4e0b\u5348"
		    ],
		    "DAY": [
		      "\u661f\u671f\u65e5",
		      "\u661f\u671f\u4e00",
		      "\u661f\u671f\u4e8c",
		      "\u661f\u671f\u4e09",
		      "\u661f\u671f\u56db",
		      "\u661f\u671f\u4e94",
		      "\u661f\u671f\u516d"
		    ],
		    "ERANAMES": [
		      "\u516c\u5143\u524d",
		      "\u516c\u5143"
		    ],
		    "ERAS": [
		      "\u516c\u5143\u524d",
		      "\u516c\u5143"
		    ],
		    "FIRSTDAYOFWEEK": 6,
		    "MONTH": [
		      "\u4e00\u6708",
		      "\u4e8c\u6708",
		      "\u4e09\u6708",
		      "\u56db\u6708",
		      "\u4e94\u6708",
		      "\u516d\u6708",
		      "\u4e03\u6708",
		      "\u516b\u6708",
		      "\u4e5d\u6708",
		      "\u5341\u6708",
		      "\u5341\u4e00\u6708",
		      "\u5341\u4e8c\u6708"
		    ],
		    "SHORTDAY": [
		      "\u5468\u65e5",
		      "\u5468\u4e00",
		      "\u5468\u4e8c",
		      "\u5468\u4e09",
		      "\u5468\u56db",
		      "\u5468\u4e94",
		      "\u5468\u516d"
		    ],
		    "SHORTMONTH": [
		      "1\u6708",
		      "2\u6708",
		      "3\u6708",
		      "4\u6708",
		      "5\u6708",
		      "6\u6708",
		      "7\u6708",
		      "8\u6708",
		      "9\u6708",
		      "10\u6708",
		      "11\u6708",
		      "12\u6708"
		    ],
		    "STANDALONEMONTH": [
		      "\u4e00\u6708",
		      "\u4e8c\u6708",
		      "\u4e09\u6708",
		      "\u56db\u6708",
		      "\u4e94\u6708",
		      "\u516d\u6708",
		      "\u4e03\u6708",
		      "\u516b\u6708",
		      "\u4e5d\u6708",
		      "\u5341\u6708",
		      "\u5341\u4e00\u6708",
		      "\u5341\u4e8c\u6708"
		    ],
		    "WEEKENDRANGE": [
		      5,
		      6
		    ],
		    "fullDate": "y\u5e74M\u6708d\u65e5EEEE",
		    "longDate": "y\u5e74M\u6708d\u65e5",
		    "medium": "y\u5e74M\u6708d\u65e5 ah:mm:ss",
		    "mediumDate": "y\u5e74M\u6708d\u65e5",
		    "mediumTime": "ah:mm:ss",
		    "short": "y/M/d ah:mm",
		    "shortDate": "y/M/d",
		    "shortTime": "ah:mm"
		  },
		  "NUMBER_FORMATS": {
		    "CURRENCY_SYM": "\u00a5",
		    "DECIMAL_SEP": ".",
		    "GROUP_SEP": ",",
		    "PATTERNS": [
		      {
		        "gSize": 3,
		        "lgSize": 3,
		        "maxFrac": 3,
		        "minFrac": 0,
		        "minInt": 1,
		        "negPre": "-",
		        "negSuf": "",
		        "posPre": "",
		        "posSuf": ""
		      },
		      {
		        "gSize": 3,
		        "lgSize": 3,
		        "maxFrac": 2,
		        "minFrac": 2,
		        "minInt": 1,
		        "negPre": "-\u00a4",
		        "negSuf": "",
		        "posPre": "\u00a4",
		        "posSuf": ""
		      }
		    ]
		  },
		  "id": "zh",
		  "localeID": "zh",
		  "pluralCat": function(n, opt_precision) {  return PLURAL_CATEGORY.OTHER;}
		});
	}]);
	*/
	app.controller('managerSchoolCtr',['$scope','$timeout','$http',function($scope,$timeout,$http) {
		   
		 //日历
	    /*$scope.dicQueryObj = {
		    fileName: '',
		    startTime:new Date(),
		    endTime: new Date(),
		    order: '0'
		};
		//时间选择器配置
		// $scope.minStartDate = ''; //开始时间的最小时间
		// $scope.maxStartDate = $scope.dicQueryObj.endTime; //开始时间的最大可选时间
		// $scope.minEndDate = $scope.dicQueryObj.startTime; //结束时间的最小可选时间要大于开始时间的设定值
		// $scope.maxEndDate = $scope.dicQueryObj.endTime; //结束时间的最大可选择时间不超过结束时间的设定值
		
		$scope.$watch('dicQueryObj.startTime', function(v){
		    $scope.dicQueryObj.endTime = v;
		});
		// $scope.$watch('dicQueryObj.endTime', function(v){
		//     $scope.maxStartDate = v;
		// });
		$scope.dateOptions = {
		    formatYear: 'yy',
		    startingDay: 1
		};
		$scope.startOpen = function() {
		    $timeout(function() {
		        $scope.startPopupOpened = true;
		    });
		};
		$scope.endOpen = function() {
		    $timeout(function() {
		        $scope.endPopupOpened = true;
		    });
		};
		$scope.startPopupOpened = false;
		$scope.endPopupOpened = false;*/
	   
	   
	    //获取学校id
	    var schoolId = {
        	id : JSON.parse(sessionStorage.getItem('userObj')).oid
        };

	    //获取学校地区
	    $scope.schoolArea = {};
	    $http.post(requireIp + '/ea/eaArea/findAreaListByAreaId',{areaId : '5d3458f31f5e4cd498b1371cb42ae39a'}).success(function (data){
   			$scope.schoolArea = data.data;
   			console.log($scope.schoolArea);
	    }).error(function (e){
	   	
	    });
	   
	    //获取学校基本信息
	    $scope.schoolDate = {};
	    
	    
	    //存储年级
	    $scope.storage = [];
	    //logo
	    $scope.imgPath = '';
	   
		$http.post(requireIp + '/ea/eaOffice/findSchoolInfoByOid',{officeId : schoolId.id}).success(function (data){
			$scope.schoolDate = data.data;
//			console.log($scope.schoolDate.gradeList);
			$scope.storage = data.data.gradeList;
			$scope.imgPath = $scope.schoolDate.school.logo;
			console.log(data)
//			console.log($scope.storage)
			//学校标识码
			$scope.schoolDate.school.code = $scope.schoolDate.school.code ? $scope.schoolDate.school.code : '';
			//学校地址
			$scope.schoolDate.school.address = $scope.schoolDate.school.address ? $scope.schoolDate.school.address : '';
			
//			console.log($scope.schoolDate);
//			console.log($scope.imgPath);
			console.log($scope.storage)
		}).error(function (e){
			console.log(e);
		});
	   
	   
	   
	   	//学校类型获取
	   	$http.get('file/schoolType.json').success(function (data){
	   		$scope.schoolType = data.data;
	   		console.log($scope.schoolType)
	   	});
	   	
	   	//提示弹框
	   	$scope.tips = {
	   		'tipsShow': false,
	   		'tipsWord' : '',
	   		'succ' : false
	   	};
	   	
	   	$scope.timer = function (sta,tips){
	   		$scope.tips.succ = sta;
			$scope.tips.tipsWord = tips;
   			$scope.tips.tipsShow = true;
	   		$timeout(function (){
	   			$scope.tips.tipsShow = false;
   			},1000);
	   	}
	   	
	   	//删除弹框
	   	$scope.delBox = false;
	   	$scope.delGrade = function (tar){
	   		$scope.delBox = true;
	   		
	   		//确认删除年级
	   		var gradeId = angular.element(tar.target).parent().attr('data-id');
	   		$scope.delSure = function (){
	   			var Yindex = angular.element(tar.target).parent().index();
	   			$scope.storage.splice(Yindex,1);
//	   			$http.post(requireIp + '/ea/eaGrade/deleteGradeById',{gradeId : gradeId , officeId : schoolId.id}).success(function (res){
	   			$http.post(requireIp + '/ea/eaGrade/deleteGradeById',{gradeId : gradeId}).success(function (res){
	   				if(res.ret == '200'){
	   					$scope.delBox = false;
	   					$scope.timer(true,'删除成功');
	   					angular.element(tar.target).parent().remove();
	   				}
	   			}).error(function (res){
	   				console.log(res)
	   			});
	   		};
	   	};
	   	
	   	
	   	//添加年级加号
	   	$scope.addBtn = false;
	   	$scope.addGradePlus = function (){
	   		$scope.addBtn = true;
	   	};
	   	
	   	//添加年级对号
	   	$scope.addInp = '';
	   	$scope.addGradeRight = function (aa){
//	   		console.log(angular.copy(aa))
//	   		console.log(angular.copy(aa[aa.length-1]))
			if($scope.addInp == '' || $scope.addInp == null){
	   			$scope.timer(false,'编辑年级不可为空');
			}else{
				$scope.storage.push({'name':$scope.addInp});
				$scope.addBtn = false;
				$scope.addInp = ''
			}
	   	};
	   	
	   	
	   	//添加年级叉号
	   	$scope.addGradeFork = function (){
	   		$scope.addBtn = false;
	   		$scope.addInp = ''
	   	};
	   	
	   	
	   	//修改提交
	   	$scope.modify = function (){
	   		
	   		//以下必填项验证
	   		if($scope.schoolDate.school.areaId == null){
	   			$scope.timer(false,'请选择区域');
	   		}else if($scope.schoolDate.school.grade == null){
	   			$scope.timer(false,'请选择学校类型');
	   		}else if($scope.schoolDate.school.name == ''){
	   			$scope.timer(false,'请填写学校名称');
	   		}else if($scope.schoolDate.school.code == ''){
	   			$scope.timer(false,'请填写学校标识码');
	   		}else if($scope.schoolDate.school.address == ''){
	   			$scope.timer(false,'请填写学校标地址');
	   		}else if($scope.addBtn){
	   			$scope.timer(false,'年级编辑未完成');
	   		}else if($scope.schoolDate.school.studentTotal == '' || $scope.schoolDate.school.studentTotal == undefined){
	   			console.log($scope.schoolDate.studentTotal)
	   			$scope.timer(false,'学生总数不可为空，为六位以内整数');
	   		}else if($scope.schoolDate.school.teacherTotal == '' || $scope.schoolDate.school.teacherTotal == undefined){
	   			$scope.timer(false,'教师总数不可为空 ，为四位以内整数');
	   		}else{
	   			console.log($scope.storage)
   				$scope.gradeIds = '';
		   		//angular循环 年级id
				angular.forEach($scope.schoolDate.gradeList,function(v,i){
		 		    $scope.gradeIds += $scope.schoolDate.gradeList[i].id + ',';
				});
				
//				$scope.gradeIds = $scope.gradeIds.substring(0,$scope.gradeIds.length-1);
				if($scope.gradeIds.indexOf('undefined') != -1){
					$scope.gradeIds = $scope.gradeIds.substring(0,$scope.gradeIds.indexOf('undefined')-1);
				}else{
					$scope.gradeIds = $scope.gradeIds.substring(0,$scope.gradeIds.length-1);
				}
//				console.log($scope.gradeIds);
				
				//编辑年级是否为空
				var editGrade = false;
		    	$scope.gradeNames = '';
		   		//提交获取年级是否修改
		   		console.log($scope.storage)
		   		angular.forEach($scope.storage,function(v,i){
		   			if($scope.storage[i].name == ''){
		   				editGrade = true;
		   			}
					$scope.gradeNames += $scope.schoolDate.gradeList[i].name + '//';
				});
				$scope.gradeNames = $scope.gradeNames.substring(0,$scope.gradeNames.length-2);
//		   		console.log($scope.gradeNames)
				
				if(editGrade){
		   			$scope.timer(false,'修改年级不能为空');
		   			return false;
				}else{
					$scope.modifyMsg = {
				   		id : schoolId.id,
				   		areaId : $scope.schoolDate.school.areaId,
				   		grade : $scope.schoolDate.school.grade,
				   		name : $scope.schoolDate.school.name,
				   		code : $scope.schoolDate.school.code,
				   		address : $scope.schoolDate.school.address,
//				   		logo : $scope.imgPath.substring($scope.imgPath.lastIndexOf('/')+1),
				   		href : $scope.schoolDate.school.href,
				   		gradeIds : $scope.gradeIds,
				   		gradeNames : $scope.gradeNames,
				   		studentTotal : $scope.schoolDate.school.studentTotal,
				   		teacherTotal : $scope.schoolDate.school.teacherTotal
		//		   		gradeIdArray : '',
		//		   		gradeNameArray : '',
		//		   		yearBegin :  '',
		//		   		yearEnd: ''
				   	};
			   		
					console.log($scope.modifyMsg);
			   		
					$http.post(requireIp + '/ea/eaOffice/updateSchoolMess',$scope.modifyMsg).success(function (res){
						if(res.ret == '200'){
							$scope.timer(true,'保存成功');
						}else{
				   			$scope.timer(false,'保存失败');
						}
					});
					
				}
				
		   	};
   		}
// 		console.log(JSON.parse(sessionStorage.getItem('userObj')).oid);
// 		console.log(schoolId.id);
	   		
   		//学校logo
   		
        $scope.uploadLogo = function(tar){
        		console.log(tar[0])
                var fd = new FormData();
//              var file = document.querySelector('input[type=file]').files[0];
                console.log(fd)
//              console.log(file)
				fd.append("id",schoolId.id);
                fd.append('filename', tar[0]);
                console.log(fd.get('filename'));
            $http({     
	               method:'POST',
	               url:requireIp+"/ea/eaOffice/upLoadOfficeLogo",
	               data: fd,
                   headers: {'Content-Type':undefined},
	               transformRequest: angular.identity 
	               }).success( function (res){
                    
                    if(res.ret == "200"){
                    	console.log(res.data.imgPath)
	   					$scope.timer(true,'上传成功');
						$scope.imgPath = res.data.imgPath;
                   }else{
	   					$scope.timer(false,'上传失败');
                  }
                
	           }).error(function(e){
	           		console.log(e)
	           })
                
        }
	   		
	   		
	   		
	   
	   
	}]);
	
	
	
	
	
	