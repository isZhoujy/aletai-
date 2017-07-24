app.controller('lessonCtrl',['$scope',function($scope) {
    $scope.lessonList = [
        {name:"小学一年级"},
        {name:"小学一年级"},
        {name:"小学一年级"},
        {name:"小学一年级"},
        {name:"小学一年级"}
    ];
    $scope.status = 0;
    $scope.changeState = function(index) {
         $scope.status = index;
    }
}])