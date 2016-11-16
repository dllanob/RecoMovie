(function() {
  'use strict';

  var app = angular
    .module('test', ['ngRoute'])
    .config(config);

  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/home', {
        templateUrl: 'app/home/index.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/users', {
        templateUrl: 'app/users/index.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/reco/:user_id', {
        templateUrl: 'app/reco/index.html',
        controller: 'MainController',
        controllerAs: 'main',
        resolve : {
            user: function(UserService, $route){
                var userid = $route.current.params.user_id;
                return UserService.get(userid);
            }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }

  app.config(function ($locationProvider) {
      $locationProvider.html5Mode(true);
  });

  app.service('votesValues', function () {
        var yes = localStorage.getItem('yes');
        var no = localStorage.getItem('no');

        return {
            getYes: function () {
                return yes;
            },
            setYes: function(value) {
                yes = value;
            },
            getNo: function () {
                return no;
            },
            setNo: function(value) {
                no = value;
            }
        };
    });

})();
