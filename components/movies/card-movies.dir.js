(function () {
	
	var cardMovieCtrl = function ($scope, MovieSrv) {
		var _this = this;

		initController();

		function initController() {

			_this.movieDetail = {};
			getMovieDetail($scope.cardMovie);
		}

		//get the movie details for get information
		//about Runtime
		function getMovieDetail(movie) {

			MovieSrv.getMovieDetail(movie)
			.then(function (data) {
				_this.movieDetail = data.data;
			})
			.catch(function (error) {
				console.log("Request Error in getMovieDetail"+ error);
			});
		}
	}

	cardMovieCtrl.$inject = ['$scope', 'MovieSrv'];

	var cardMovie = function () {
		return {
			restrict: 'EA',
			scope: {
				cardMovie: '=movie'
			},
			templateUrl : '/components/movies/card-movies.html',
			controller: cardMovieCtrl,
			controllerAs: 'cardMovieCtrl'
		}
	};

	angular.module('showapp').directive('cardMovie', cardMovie);
})();