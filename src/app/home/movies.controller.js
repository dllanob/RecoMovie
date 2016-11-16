(function() {
  'use strict';

  var app = angular
    .module('test')
    .controller('MovieController', MovieController);

  app.constant('API_SERVER', 'http://localhost:4000/');

  app.factory('MoviesService', function ($http, API_SERVER) {
      var api_url = API_SERVER + "movies";      
      return {
          list : function(){
              return $http({method: "GET", url : api_url});
          },
          get : function(movie_id){
                var url = api_url + '/'+ movie_id + '/';
                return $http({method: 'GET', url: url});
          },
          save : function(movieobj){
                var url = api_url;
                var req = {
                  method: 'POST', 
                  url:url,
                  data: movieobj,
                  headers : {'Content-Type': 'application/json'}
                };               
                return $http(req);
          },
          update: function(movieobj, movieid){
                var url = api_url + "/" + movieid + "/";
                var req = {
                  method: 'PUT', 
                  url:url,
                  data: movieobj,
                  headers : {'Content-Type': 'application/json'}
                };             
                return $http(req);
          }
      };
  });

  app.factory('GenresService', function ($http, API_SERVER) {
      var api_url = API_SERVER + "genres";      
      return {
          list : function(){
              return $http({method: "GET", url : api_url});
          }
      };
  });

  /** @ngInject */
  function MovieController($scope, $http, MoviesService, GenresService, $rootScope, votesValues) {

    $scope.info = true;

    $scope.length;

    $scope.yes = votesValues.getYes();
    $scope.no = votesValues.getNo();

    console.log($scope.yes+" "+$scope.no);

    
    MoviesService.list().then(function(data){
        $scope.movies = data.data;
        $scope.length= Object.keys($scope.movies).length;
    });

    GenresService.list().then(function(data){
        $scope.genres = data.data;
        $scope.genlength= Object.keys($scope.genres).length;
    });

    $scope.addMovie = function(){
        
        var x = (function genreValidator() {
          var genrecode = "G";
          var genretext = "";

          if ($scope.movie.gen1 == true) {
              genrecode += "1";
              genretext += "| Aventura ";
          } else {
              genrecode += "0";
          }
          if ($scope.movie.gen2 == true) {
              genrecode += "1";
              genretext += "| Acción ";
          } else {
              genrecode += "0";
          }
          if ($scope.movie.gen3 == true) {
              genrecode += "1";
              genretext += "| Animada ";
          } else {
              genrecode += "0";
          }
          if ($scope.movie.gen4 == true) {
              genrecode += "1";
              genretext += "| Comedia ";
          } else {
              genrecode += "0";
          }
          if ($scope.movie.gen5 == true) {
              genrecode += "1";
              genretext += "| Comedia Romántica ";
          } else {
              genrecode += "0";
          }
          if ($scope.movie.gen6 == true) {
              genrecode += "1";
              genretext += "| Ciencia Ficción ";
          } else {
              genrecode += "0";
          }
          if ($scope.movie.gen7 == true) {
              genrecode += "1";
              genretext += "| Documentales ";
          } else {
              genrecode += "0";
          }
          if ($scope.movie.gen8 == true) {
              genrecode += "1";
              genretext += "| Drama ";
          } else {
              genrecode += "0";
          }
          if ($scope.movie.gen9 == true) {
              genrecode += "1";
              genretext += "| Fantasía ";
          } else {
              genrecode += "0";
          }
          if ($scope.movie.gen10 == true) {
              genrecode += "1";
              genretext += "| Musicales ";
          } else {
              genrecode += "0";
          }
          if ($scope.movie.gen11 == true) {
              genrecode += "1";
              genretext += "| Romance ";
          } else {
              genrecode += "0";
          }
          if ($scope.movie.gen12 == true) {
              genrecode += "1";
              genretext += "| Terror ";
          } else {
              genrecode += "0";
          }
          if ($scope.movie.gen13 == true) {
              genrecode += "1";
              genretext += "| Horror ";
          } else {
              genrecode += "0";
          }
          if ($scope.movie.gen14 == true) {
              genrecode += "1";
              genretext += "| Suspenso ";
          } else {
              genrecode += "0";
          }
          if ($scope.movie.gen15 == true) {
              genrecode += "1";
              genretext += "| Thriller ";
          } else {
              genrecode += "0";
          }
          if ($scope.movie.gen16 == true) {
              genrecode += "1";
              genretext += "| Misterio ";
          } else {
              genrecode += "0";
          }
          if ($scope.movie.gen17 == true) {
              genrecode += "1";
              genretext += "| Crimen ";
          } else {
              genrecode += "0";
          }
          console.log(genrecode);
          console.log(genretext);
          return {
              code: genrecode,
              text: genretext
          };
        })();
        
        var movie = {
           "name": $scope.movie.name,
           "description":$scope.movie.description,
           "genres": x.text,
           "genrecode": x.code,         
           "year": $scope.movie.year,
           "duration": $scope.movie.duration,
           "director": $scope.movie.director,
           "cast": $scope.movie.cast,
           "imgroute": "newmovie.jpg",
           "rank":null
        };

        MoviesService.save(movie).then(function(){
             $scope.movies.push(movie);
             $scope.length= (Object.keys($scope.movies).length);
             swal("Transacción exitosa!", "La película se ha añadido satisfactoriamente.", "success");
             $scope.movie.name = "";
             $scope.movie.description = "";
             $scope.movie.year = "";
             $scope.movie.duration = "";
             $scope.movie.director = "";
             $scope.movie.cast = "";
        })
        .catch(function(){
            swal("Error", "La película no se ha añadido. Intenta de nuevo", "error");
        });
    };

    /////////////////////////////////////////////
    // CHART  ///////////////////////////////////
    ///////////////////////////////////////////// 

    var ctx = document.getElementById("myChart");
    
    var data = {
        labels: [
            "Si",
            "No"
        ],
        datasets: [
            {
                data: [$scope.yes , $scope.no],
                backgroundColor: [
                    "rgba(255,87,34,1)",
                    "rgba(68,211,231,1)"

                ],
                borderColor: [
                    "rgba(216,75,32,1)",
                    "rgba(58,169,183,1)"
                ],
                hoverBackgroundColor: [
                    "rgba(255,125,86,.6)",
                    "rgba(68,211,231,.6)"
                ],
                hoverBorderColor: [
                    "rgba(255,87,34,1)",
                    "rgba(68,211,231,1)"
                ]
            }]
    };

    // And for a doughnut chart
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data
    });

  }
})();
