(function () {
	
	var cardsListCtrl = function ($scope) {
		var _this = this;

		initController();

		function initController() {

		}

	}

	cardsListCtrl.$inject = ['$scope'];

	var cardsList = function () {
		return {
			restrict: 'EA',
			scope: {
				list: "="
			},
			templateUrl : '/components/commons/cards-container.html',
			controller: cardsListCtrl,
			controllerAs: 'cardsListCtrl'
		}
	};

	angular.module('showapp').directive('cardsList', cardsList);
})();