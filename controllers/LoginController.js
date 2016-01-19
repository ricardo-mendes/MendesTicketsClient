(function() {

	'use strict';

    angular
		.module('app')
		.controller('LoginController', LoginController);
		
	LoginController.$inject = ['$scope', '$location', 'baseApi', 'loginApi'];	
	
	function LoginController($scope, $location, baseApi, loginApi) { 
			
		if(baseApi.userIsAuthenticated()){
			$location.path("/home");
		}
		
		$scope.showLoading = false;
			
		$scope.userLogin = {
			email : "",
			password : ""
		};
		
		$scope.login = function() {
			
			$scope.showLoading = true;
			
            loginApi.login($scope.userLogin)
            .then(
                function(data){
					console.log(data.token);
                    baseApi.setValueInAccessTokenCookie(data.token);
                    $location.path("/home");
                },
                function(data){
                    alert(data.error);
					$scope.showLoading = false;
                }
            );
		}
		
	}
	
}());