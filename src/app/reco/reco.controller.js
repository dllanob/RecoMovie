(function() {
  'use strict';

  var app = angular
    .module('test')
    .controller('RecoController', RecoController);

  

  /** @ngInject */
  function RecoController($scope, $http, MoviesService, GenresService, UserService, $routeParams, $rootScope, votesValues) {

    var userId = $routeParams.user_id;
    
    $scope.info = true;

    $scope.yes = votesValues.getYes();
    $scope.no = votesValues.getNo();

    console.log($scope.yes+" "+$scope.no);

    
    function codeComparation(code1, code2) {
        // body...
        var code1 = code1;
        var code2 = code2;
        var result = 0;

        for (var i = 0; i < code2.length; i++) {
            if (code1[i] == 1 && code1[i] == code2[i] ) {
                result ++;
            }
        }
        return result;
    }                       

    function match(userid) {
        
        var userid = userid;
    

        UserService.get(userid).then(function(data){
            $scope.user = data.data;
            var code1 = $scope.user.preferencecode; 

            MoviesService.list().then(function(data){

                $scope.newmovies = data.data;
                $scope.length= Object.keys($scope.newmovies).length;

                for (var i = 0; i < $scope.length; i++) {
                  var result = codeComparation(code1, $scope.newmovies[i].genrecode);
                  $scope.newmovies[i].rank = result;                   
                }   
            });
        });
    };
    match(userId);

    $scope.addYes = function() {
      $scope.yes++;
      votesValues.setYes($scope.yes);
      localStorage.setItem('yes', $scope.yes);
      swal("Gracias por tu opinión!", "Esperamos seguir brindadote buenas recomendaciones ;).", "success");
    }

    $scope.addNo = function() {
      $scope.no++;
      votesValues.setNo($scope.no);
      localStorage.setItem('no', $scope.no);
      swal({   title: "Sentimos desepcionarte!",   text: "Haremos lo mejor por mejorar nuestras recomendaciones.",   imageUrl: "http://emojipedia-us.s3.amazonaws.com/cache/b0/47/b0474e56092bc1e34da0930cc6b69856.png" });
    }
    
  }
})();
