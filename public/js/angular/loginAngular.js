var app = angular.module('LoginApp', [
    'ngMaterial',
])

.controller('LoginCtrl', function($scope,$http, $window){
  $scope.invalidLogin = true;
  $scope.login = function(){
    console.log("Hello this is http request.");
    $http({
      method:"POST",
      url:'/doLogin',
      data : {
        "username":$scope.username,
        "password":$scope.password
      }


    }).then(function(res){
      console.log("Hello this is response");
      console.log(res);
      if (res.data.passwordMatched) {
        $window.location.href = "/"
      } else if (!res.data.passwordMatched) {
        console.log("invalid login");
        $scope.invalidLogin = false;
      }
    }, function(err) { //this will be called on error
      console.log(err);
    });

  }
});
