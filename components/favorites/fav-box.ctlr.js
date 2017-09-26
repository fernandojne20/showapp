(function (){

	var favBoxCtlr = function (FavSrv) {
		var _this = this;

		_this.searchFav = searchFav;

		initController();


		function initController() {

			_this.favList = {};
			_this.searchQuery = "";
			getFav();
			

		}

		//Allow get fav card from the service.
		function getFav() {
			_this.favList = {results : FavSrv.getFavorites(), favorites: true};
		}

		function searchFav() {
			console.log(_this.searchFav);
		}

	};

	favBoxCtlr.$inject = ['FavSrv'];

	/**
	*  Module
	*
	* Description
	*/
	angular.module('showapp').controller('FavBoxCtlr', favBoxCtlr);
})();
