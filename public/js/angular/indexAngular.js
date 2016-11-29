'use strict';
var indexAngularApp = angular.module('indexAngularApp', ['ui.bootstrap', 'ui.router', 'ngCookies', 'ngclipboard']);

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
            .state('favourites', {
                url: '/favourites',
                templateUrl: '/favourites'
            });
    }
]);


/**
 * Master Controller
 */

indexAngularApp.controller('indexCtrl', ['$scope', '$cookieStore', '$window', indexCtrl]);
function indexCtrl($scope, $cookieStore, $window) {
    var mobileView = 992;

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

      $window.location.href = "/login"
    }

}


indexAngularApp.controller('ClipboardHistoryCtrl', ['$scope', ClipboardHistoryCtrl]);
function ClipboardHistoryCtrl($scope) {

  $scope.onCopy = function(e) {
      console.info('Action:', e.action);
      console.info('Text:', e.text); //use e.text to do anything with the copied text.
      e.clearSelection();
  };


  $scope.isFavourite = false;
  $scope.favClass = "glyphicon-star-empty";
  $scope.clickFavourite = function(){
    //----------UI things----------------//
    if(!$scope.isFavourite){
      $scope.favClass = "glyphicon-star";
      $scope.isFavourite = true;
    }else{
      $scope.favClass = "glyphicon-star-empty";
      $scope.isFavourite = false;
    }
    //-----------------------------------//
    console.log("Favourited.");
  }


  $scope.clickDelete = function(){
    console.log("Deleted.");
  }


}
