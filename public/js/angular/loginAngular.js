var app = angular.module('LoginApp', [
    'ngMaterial',
])

.controller('LoginCtrl', function($scope,$http, $window){

//-----------------login function--------------------------//
  $scope.invalidLogin = false;
  $scope.login = function(){
    $http({
      method:"POST",
      url:'/doLogin',
      data : {
        "email":$scope.email,
        "password":$scope.password
      }
    }).then(function(res){
      if (res.data.passwordMatched) {
        $window.location.href = "/"
      } else if (!res.data.passwordMatched) {
        console.log("invalid login");
        $scope.invalidLogin = true;
      }
    }, function(err) { //this will be called on error
      console.log(err);
    });
  }


  //-----------------signup function--------------------------//
    $scope.signup = function(){

      $http({
        method:"POST",
        url:'/doSignup',
        data : {
          "firstname":$scope.firstname,
          "lastname":$scope.lastname,
          "email":$scope.email,
          "password":$scope.password
        }
      }).then(function(res){
        if (res.data.passwordMatched) {
          $window.location.href = "/"
        } else if (!res.data.passwordMatched) {
        }
      }, function(err) { //this will be called on error
        console.log(err);
      });
    }



});
