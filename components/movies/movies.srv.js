(function () {

    var movieSrv = function ($http, sysConfig) {
        var srv = {};

        srv.getMovies = getMovies;
        srv.getGenres = getGenres;
        srv.searchMovies = searchMovies;
        srv.getMovieDetail = getMovieDetail;

        return srv;

        //Get a List of movies from API.
        //Can be filtered by genre and year.
        function getMovies(genre = {}, year = "") {
        	setParams("", "");
        	return $http.get( generateApiUrl('/discover/movie', setMovieParams(genre, year)));
        }

        //Get all genres allowed for movies
        function getGenres() {
        	return $http.get( generateApiUrl('/genre/movie/list'));
        }

        //Search Movies by name.
        //Can be filtered by year.
        function searchMovies(searchQuery, year = "") {
        	return $http.get(generateApiUrl('/search/movie', setSearchParams(searchQuery, year)));
        }

        function getMovieDetail(movie) {
        	return $http.get(generateApiUrl('/movie/'+ movie.id));
        }

        //Generate Api URL with params for any endPoint
        function generateApiUrl(endPoint, params = "") {
        	
        	params = params !="" ? ('&'+params) : "";
        	return encodeURI(sysConfig.apiUrl + endPoint + '?' + sysConfig.apiKeyAttr + params);
        }

        //Allow set the movie params in order to use the genre and year filters.
        function setMovieParams(genre, year) {

        	var paramsName = {genre: "with_genres=", year : "primary_release_year="};
        	var paramsValue = {};

        	if (typeof (genre.id) != 'undefined'){
        		paramsValue.genre = genre.id;
        	}
        	if (year != ''){
        		paramsValue.year = year;
        	}

        	return setParams(paramsName, paramsValue);
        }

        //Allow set the movie params in order to use the genre and year filters.
        function setSearchParams(searchQuery, year) {

        	var paramsName = {search: "query=", year : "year="};
        	var paramsValue = {};

        	if (searchQuery != ''){
        		paramsValue.search = searchQuery;
        	}
        	if (year != ''){
        		paramsValue.year = year;
        	}

        	return setParams(paramsName, paramsValue);
        }        

        //Allow set general request params in order to use filters.
        function setParams(paramsNames, paramsValues) {

			var params = [];

        	for (var prop in paramsValues){
        		params.push(paramsNames[prop]+paramsValues[prop]);
        	}

        	return params.join("&");

        }
    };

    //Inject Services Dependencies
    movieSrv.$inject = ['$http', 'sysConfig'];


    angular.module('showapp').factory('MovieSrv', movieSrv);

}());