(function() {
  'use strict';

  var app = angular
    .module('test')
    .controller('UserController', UserController);

  app.constant('API_SERVER', 'http://localhost:4000/');

  app.factory('UserService', function ($http, API_SERVER) {
      var api_url = API_SERVER + "users";      
      return {
          list : function(){
              return $http({method: "GET", url : api_url});
          },
          get : function(user_id){
                var url = api_url + '/'+ user_id + '/';
                return $http({method: 'GET', url: url});
          },
          save : function(userobj){
                var url = api_url;
                var req = {
                  method: 'POST', 
                  url:url,
                  data: userobj,
                  headers : {'Content-Type': 'application/json'}
                };               
                return $http(req);
          }
      };
  });

  /** @ngInject */
  function UserController($scope, $http, UserService) {

    $scope.info = true;
    
    UserService.list().then(function(data){
        $scope.users = data.data;
        $scope.length= Object.keys($scope.users).length;
    });

    $scope.addUser = function(){

        var x = (function genreValidator() {
          var genrecode = "G";
          var genretext = "";

          if ($scope.user.gen1 == true) {
              genrecode += "1";
              genretext += "| Aventura ";
          } else {
              genrecode += "0";
          }
          if ($scope.user.gen2 == true) {
              genrecode += "1";
              genretext += "| Acción ";
          } else {
              genrecode += "0";
          }
          if ($scope.user.gen3 == true) {
              genrecode += "1";
              genretext += "| Animada ";
          } else {
              genrecode += "0";
          }
          if ($scope.user.gen4 == true) {
              genrecode += "1";
              genretext += "| Comedia ";
          } else {
              genrecode += "0";
          }
          if ($scope.user.gen5 == true) {
              genrecode += "1";
              genretext += "| Comedia Romántica ";
          } else {
              genrecode += "0";
          }
          if ($scope.user.gen6 == true) {
              genrecode += "1";
              genretext += "| Ciencia Ficción ";
          } else {
              genrecode += "0";
          }
          if ($scope.user.gen7 == true) {
              genrecode += "1";
              genretext += "| Documentales ";
          } else {
              genrecode += "0";
          }
          if ($scope.user.gen8 == true) {
              genrecode += "1";
              genretext += "| Drama ";
          } else {
              genrecode += "0";
          }
          if ($scope.user.gen9 == true) {
              genrecode += "1";
              genretext += "| Fantasía ";
          } else {
              genrecode += "0";
          }
          if ($scope.user.gen10 == true) {
              genrecode += "1";
              genretext += "| Musicales ";
          } else {
              genrecode += "0";
          }
          if ($scope.user.gen11 == true) {
              genrecode += "1";
              genretext += "| Romance ";
          } else {
              genrecode += "0";
          }
          if ($scope.user.gen12 == true) {
              genrecode += "1";
              genretext += "| Terror ";
          } else {
              genrecode += "0";
          }
          if ($scope.user.gen13 == true) {
              genrecode += "1";
              genretext += "| Horror ";
          } else {
              genrecode += "0";
          }
          if ($scope.user.gen14 == true) {
              genrecode += "1";
              genretext += "| Suspenso ";
          } else {
              genrecode += "0";
          }
          if ($scope.user.gen15 == true) {
              genrecode += "1";
              genretext += "| Thriller ";
          } else {
              genrecode += "0";
          }
          if ($scope.user.gen16 == true) {
              genrecode += "1";
              genretext += "| Misterio ";
          } else {
              genrecode += "0";
          }
          if ($scope.user.gen17 == true) {
              genrecode += "1";
              genretext += "| Crimen ";
          } else {
              genrecode += "0";
          }
          return {
              code: genrecode,
              text: genretext
          };
        })();
        
        var user = {
           "firstName": $scope.user.firstname,
           "lastName": $scope.user.lastname,
           "age": $scope.user.age,
           "genre": $scope.user.genre,         
           "preference": x.text,
           "preferencecode": x.code
        };

        UserService.save(user).then(function(){
             $scope.users.push(user);
             $scope.length= (Object.keys($scope.users).length);
             swal("Transacción exitosa!", "El usuario se ha añadido satisfactoriamente.", "success");
             $scope.user.firstname = "";
             $scope.user.lastname = "";
             $scope.user.age = "";
             $scope.user.genre = "";
        })
        .catch(function(){
            swal("Error!", "El usuario no se ha añadido. Intenta de nuevo.", "error");
        });
    };

  }
})();