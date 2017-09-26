(function () {

    var seriesSrv = function ($http, sysConfig) {
        var srv = {};

        srv.getSeries = getSeries;
        srv.getGenres = getGenres;
        srv.searchSeries = searchSeries;
        srv.getSerieDetail = getSerieDetail;

        return srv;

        //Get a List of movies from API.
        //Can be filtered by genre and year.
        function getSeries(genre = {}, year = "") {
        	setParams("", "");
        	return $http.get( generateApiUrl('/discover/tv', setSerieParams(genre, year)));
        }

        //Get all genres allowed for movies
        function getGenres() {
        	return $http.get( generateApiUrl('/genre/tv/list'));
        }

        //Search Movies by name.
        //Can be filtered by year.
        function searchSeries(searchQuery, year = "") {
        	return $http.get(generateApiUrl('/search/tv', setSearchParams(searchQuery, year)));
        }

        function getSerieDetail(serie) {
        	return $http.get(generateApiUrl('/tv/'+ serie.id));
        }

        //Generate Api URL with params for any endPoint
        function generateApiUrl(endPoint, params = "") {
        	
        	params = params !="" ? ('&'+params) : "";
        	return encodeURI(sysConfig.apiUrl + endPoint + '?' + sysConfig.apiKeyAttr + params);
        }

        //Allow set the movie params in order to use the genre and year filters.
        function setSerieParams(genre, year) {

        	var paramsName = {genre: "with_genres=", year : "first_air_date_year="};
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

        	var paramsName = {search: "query=", year : "first_air_date_year="};
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
    seriesSrv.$inject = ['$http', 'sysConfig'];


    angular.module('showapp').factory('SeriesSrv', seriesSrv);

}());