(function () {
	
	var cardSerieCtrl = function ($scope, SeriesSrv) {
		var _this = this;

		initController();

		function initController() {

			_this.serieDetail = {};

			getSerieDetail($scope.cardSerie);
		}

		function getSerieDetail(serie) {

			SeriesSrv.getSerieDetail(serie)
			.then(function (data) {
				_this.serieDetail = data.data;
			})
			.catch(function (error) {
				console.log("Error getting Serie details info" + error)
			});
		}
	}

	cardSerieCtrl.$inject = ['$scope', 'SeriesSrv'];

	var cardSerie = function () {
		return {
			restrict: 'EA',
			scope: {
				cardSerie: '=serie'
			},
			templateUrl : '/components/series/card-series.html',
			controller: cardSerieCtrl,
			controllerAs: 'cardSerieCtrl'
		}
	};

	angular.module('showapp').directive('cardSerie', cardSerie);
})();