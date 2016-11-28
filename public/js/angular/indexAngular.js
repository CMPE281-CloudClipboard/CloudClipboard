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


//
//
// indexAngularApp.controller('AlertsCtrl', ['$scope', AlertsCtrl]);
// function AlertsCtrl($scope) {
//     $scope.alerts = [{
//         type: 'success',
//         msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!'
//     }, {
//         type: 'danger',
//         msg: 'Found a bug? Create an issue with as many details as you can.'
//     }];
//
//     $scope.addAlert = function() {
//         $scope.alerts.push({
//             msg: 'Another alert!'
//         });
//     };
//
//     $scope.closeAlert = function(index) {
//         $scope.alerts.splice(index, 1);
//     };
// }
