'use strict';
var indexAngularApp = angular.module('indexAngularApp', ['ui.bootstrap', 'ui.router', 'ngCookies']);

/**
 * Route configuration for the RDash module.
 */
indexAngularApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: '/clipboardhistory'
            })
            .state('clipboardhistory', {
                url: '/clipboardhistory',
                templateUrl: '/clipboardhistory'
            })
            .state('search', {
                url: '/search',
                templateUrl: '/search'
            })
            .state('favourites', {
                url: '/favourites',
                templateUrl: '/favourites'
            });
    }
]);


/**
 * Master Controller
 */

indexAngularApp.controller('indexCtrl', ['$scope','$http', '$cookieStore', '$window', indexCtrl]);
function indexCtrl($scope,$http, $cookieStore, $window) {
    var mobileView = 992;
    $scope.title = "Recent Clipboard Entries";
    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };


    //-----------------logout------------------------//
    $scope.logout = function(){
      //Do whatever is to be done on logout.
      $http({
      method:"POST",
      url:'/doLogout',
      data:{

      }
    }).then(function(res){
      console.log("Logged out");
      $window.location.href = "/login"
      
    }, function(err) { //this will be called on error
      console.log(err);
    });
      
    }

}


indexAngularApp.controller('ClipboardHistoryCtrl', ['$scope', '$http', ClipboardHistoryCtrl]);
function ClipboardHistoryCtrl($scope, $http) {
  $scope.historyArray = [];
  $scope.loadHistory = function(){
    $http({
      method:"GET",
      url:'/getHistory'
    }).then(function(res){
      if (res.data) {
        $scope.historyArray = res.data;
      } else if (!res.data) {
      }
    }, function(err) { //this will be called on error
      console.log(err);
    });
  };
  $scope.loadHistory();

  //--------Favourite----------------//
  $scope.isFavourite = false;
  $scope.clickFavourite = function(timestamp, favClass){
    var favflag = 0;
    if(favClass == "glyphicon-star-empty"){
      favflag = 1
    }
    $http({
      method:"POST",
      url:'/favHistory',
      data:{
        "timestamp" : timestamp,
        "favflag" : favflag
      }
    }).then(function(res){
      if (res.status == 200) {
        $scope.loadHistory();
      } else {
        console.log(res.status);
      }
    }, function(err) { //this will be called on error
      console.log(err);
    });
  }

  $scope.clickDelete = function(timestamp){
    $http({
      method:"POST",
      url:'/deleteHistory',
      data:{
        "timestamp" : timestamp
      }
    }).then(function(res){
      if (res.status == 200) {
        $scope.loadHistory();
      } else {
        console.log(res.status);
      }
    }, function(err) { //this will be called on error
      console.log(err);
    });
  }
}


indexAngularApp.controller('FavouriteCtrl', ['$scope', '$http', FavouriteCtrl]);
function FavouriteCtrl($scope, $http) {
  $scope.historyArray = [];
  $scope.loadFav = function(){
    $http({
      method:"GET",
      url:'/getFav'
    }).then(function(res){
      if (res.data) {
        $scope.historyArray = res.data;
      } else if (!res.data) {
      }
    }, function(err) { //this will be called on error
      console.log(err);
    });
  };
  $scope.loadFav();

  //--------Favourite----------------//
  $scope.isFavourite = false;
  $scope.clickFavourite = function(timestamp, favClass){
    var favflag = 0;
    if(favClass == "glyphicon-star-empty"){
      favflag = 1
    }
    $http({
      method:"POST",
      url:'/favHistory',
      data:{
        "timestamp" : timestamp,
        "favflag" : favflag
      }
    }).then(function(res){
      if (res.status == 200) {
        $scope.loadFav();
      } else {
        console.log(res.status);
      }
    }, function(err) { //this will be called on error
      console.log(err);
    });
  }

  $scope.clickDelete = function(timestamp){
    $http({
      method:"POST",
      url:'/deleteHistory',
      data:{
        "timestamp" : timestamp
      }
    }).then(function(res){
      if (res.status == 200) {
        $scope.loadFav();
      } else {
        console.log(res.status);
      }
    }, function(err) { //this will be called on error
      console.log(err);
    });
  }
}
