(function() {

	'use strict';

    angular
		.module('app')
		.controller('MenuController', MenuController);
		
	MenuController.$inject = ['$scope',	'$location', 'menuApi' ,'baseApi'];	
	
	function MenuController($scope, $location, menuApi, baseApi) { 
			
		$scope.userIsAuthenticated = false;
		$scope.acessTokenId = baseApi.getAccessTokenCookie();
		
		if(baseApi.userIsAuthenticated()){
			$scope.userIsAuthenticated = true;
		}
		
		$scope.deleteAccessToken = function() {

            menuApi.deleteAccessToken($scope.acessTokenId)
            .then(
                function(data){
					baseApi.deleteCookie();
                    $location.path("/home");
                },
                function(error){
                    alert("Erro ao sair");
                }
            );
		}
			
	}
	
}());