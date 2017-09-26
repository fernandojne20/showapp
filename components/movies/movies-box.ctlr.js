(function (){

	var movieBoxCtlr = function (MovieSrv) {
		var _this = this;

		_this.searchMovies = searchMovies;

		initController();

		function initController() {
			_this.moviesList = {};
			_this.genres = {};
			_this.genre = {};
			_this.years = generateYears(1970, 2017);
			_this.yearSelected = "";
			_this.searchQuery = "";
			getMovies();
			getGenres();
			

		}

		function getMovies(genre = {}, year = "") {
			console.log('Entró a getMovies');
			MovieSrv.getMovies(genre, year)
				.then(function (data) {
					setMovies(data.data);
					
				})
				.catch(function (error) {
					handleError(error);
				});
		}

		function getGenres() {
			console.log('Entró a getGenres');
			MovieSrv.getGenres()
				.then(function (data) {
					setGenres(data.data.genres);
				})
				.catch(function (error) {
					handleError(error);
				});
		}

		function searchMovies() {

			if (_this.searchQuery == "") {
			 	getMovies(_this.genre, _this.yearSelected);
				return;
			}

			MovieSrv.searchMovies(_this.searchQuery, _this.yearSelected)
			 	.then(function (data) {
			 		setMovies(data.data);
			 	})
			 	.catch ( function (error) {
			 		handleError(error);
			 	})
		}

		//Allow to generate de select with years values
		function generateYears(from, to) {

			return Array.apply(null, Array(to - from + 1))
					.map(function (_, year) {return to - year;});
		}

		function setMovies(movies) {
			_this.moviesList = movies;
			_this.moviesList.movies = true;
			console.log(JSON.stringify(_this.moviesList));
		}

		function setGenres(genres) {
			_this.genres = genres;
			console.log(JSON.stringify(genres));
		}

		function handleError(error) {
			console.log(error);
		}
	};

	movieBoxCtlr.$inject = ['MovieSrv'];

	/**
	*  Module
	*
	* Description
	*/
	angular.module('showapp').controller('MovieBoxCtlr', movieBoxCtlr);
})();
