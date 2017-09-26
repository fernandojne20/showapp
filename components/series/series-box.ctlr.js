(function (){

	var seriesBoxCtlr = function (SeriesSrv) {
		var _this = this;

		_this.searchSeries = searchSeries;

		initController();


		function initController() {
			_this.seriesList = {};
			_this.genres = {};
			_this.genre = {};
			_this.years = generateYears(1970, 2017);
			_this.yearSelected = "";
			_this.searchQuery = "";
			getseries();
			getGenres();
			

		}

		function getseries(genre = {}, year = "") {
			console.log('Entró a getseries');
			SeriesSrv.getSeries(genre, year)
				.then(function (data) {
					setSeries(data.data);
					
				})
				.catch(function (error) {
					handleError(error);
				});
		}

		function getGenres() {
			console.log('Entró a getGenres');
			SeriesSrv.getGenres()
				.then(function (data) {
					setGenres(data.data.genres);
				})
				.catch(function (error) {
					handleError(error);
				});
		}

		function searchSeries() {

			if (_this.searchQuery == "") {
			 	getseries(_this.genre, _this.yearSelected);
				return;
			}

			SeriesSrv.searchSeries(_this.searchQuery, _this.yearSelected)
			 	.then(function (data) {
			 		setSeries(data.data);
			 	})
			 	.catch ( function (error) {
			 		handleError(error);
			 	})
		}

		function generateYears(from, to) {

			return Array.apply(null, Array(to - from + 1))
					.map(function (_, year) {return to - year;});
		}

		function setSeries(series) {
			_this.seriesList = series;
			_this.seriesList.series = true;
		}

		function setGenres(genres) {
			_this.genres = genres;
		}

		function handleError(error) {
			console.log(error);
		}
	};

	seriesBoxCtlr.$inject = ['SeriesSrv'];

	/**
	*  Module
	*
	* Description
	*/
	angular.module('showapp').controller('SeriesBoxCtlr', seriesBoxCtlr);
})();
