(function () {
	
	function config($stateProvider, $urlRouterProvider) {
		
		$urlRouterProvider.otherwise('/home/movies');

		$stateProvider
			.state('home',{
				abastract: true,
				url: '/home',
				templateUrl: 'components/commons/main-template.html'
			})
			.state('home.movies', {
				url: '/movies',
				templateUrl: '/components/movies/movies-box.html',
			})
			.state('home.series', {
				url: '/series',
				templateUrl: '/components/series/series-box.html',
			})
			.state('home.favorites', {
				url: '/favorites',
				templateUrl: '/components/favorites/fav-box.html',
			});
	}

	var sysConfig = {
		baseImgUrl: 'https://image.tmdb.org/t/p/w500',
		apiUrl: 'https://api.themoviedb.org/3',
		apiKeyAttr: 'api_key=92753661bbc1c780d79824a231f4a4cb'
	};

	angular.module('showapp')
		.config(config)
		.constant('sysConfig', sysConfig);
})();