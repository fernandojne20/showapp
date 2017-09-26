(function () {

    var favSrv = function ($localStorage) {
        var srv = {};

        //publics functions
        srv.getFavorites = getFavorites;


        return srv;

        //Get a List of movies from API.
        //Can be filtered by genre and year.
        function getFavorites() {
        	return $localStorage.favList;
        }

    };

    //Inject Services Dependencies
    favSrv.$inject = ['$localStorage'];


    angular.module('showapp').factory('FavSrv', favSrv);

}());