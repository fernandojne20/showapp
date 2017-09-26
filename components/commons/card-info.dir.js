(function () {
	
	//Card Information Controller
	var cardInfoCtrl = function (sysConfig, $scope, $localStorage) {
		var _this = this;

		_this.getUrlImg = getUrlImg;
		_this.getRuntimeFormatted = getRuntimeFormatted;
		_this.saveFav = saveFav;

		initController();

		function initController() {
		}

		//Allow get the complete URL path for image
		function getUrlImg(poster_path) {
			return sysConfig.baseImgUrl + poster_path; 
		}

		//format runtime : (hours h minutes min)
		function getRuntimeFormatted(runtime) {
			
			var hours = runtime / 60;
			var minutes = runtime % 60;

			return [Math.trunc(hours), "h ", minutes, "min "].join("");
		}

		//Allow save favorites triggered by favorite button
		function saveFav() {
			saveCard(angular.copy($scope.cardInfo));
		}

		//Allow save the card to favorites local storage
		function saveCard(card) {
			if(typeof($localStorage.favList) == 'undefined'){
				$localStorage.favList = [];
			}
			$localStorage.favList.push(card);

		}


	}

	cardInfoCtrl.$inject = ['sysConfig','$scope', '$localStorage'];

	var cardInfo = function () {
		return {
			restrict: 'EA',
			scope: {
				cardInfo: '=info',
				runtime: '@',
				middleDscrp: '@',
				rightDscrp: '@',
				name: '@'
			},
			templateUrl : '/components/commons/card-box.html',
			controller: cardInfoCtrl,
			controllerAs: 'cardInfoCtrl'
		}
	};

	angular.module('showapp').directive('cardInfo', cardInfo);
})();