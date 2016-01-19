
(function() {

    angular
		.module('app')
		.controller('RegisterController', RegisterController);
		
	RegisterController.$inject = ['$scope', '$location', 'baseApi', 'registerApi'];	
		
	function RegisterController($scope, $location, baseApi, registerApi) { 
		
		if(baseApi.userIsAuthenticated()){
			$location.path("/home");
		}
		
		$scope.showLoading = false;
		
		$scope.user = {
			name : "",
			cpf : "",
			birthDate : "",
			gender : "",
			state : "",
			city : "",
			neighborhood : "",
			street : "",
			email : "",
			password : ""
		};
		
		
		$scope.register = function() {
			
			$scope.showLoading = true;
			
			registerApi.userRegister($scope.user)
            .then(
                function(data){
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