(function(){

	'use strict';
    
    angular
		.module('app')
		.factory('registerApi', registerApi);
		
	registerApi.$inject = ['$http', '$q'];
		
	function registerApi($http, $q) {
	
		$http.defaults.headers.common = {"Accept": "application/json"}; 
		$http.defaults.headers.common = {"Content-Type": "application/json"}; 
		var deferred = $q.defer();
		var apiBaseUrl = "http://mendesticketsapi.azurewebsites.net/api/";
		

		var service = {
			userRegister: userRegister
		};

		return service;

		////////////

		function userRegister(user) {
			
			var deferred = $q.defer();

            $http.post(apiBaseUrl + "User", user)
                .success(function(data){
                    deferred.resolve(data);
                })
                .error(function(data){
                    deferred.reject(data);
                });

            return deferred.promise;
			
		}

		

	}	
    
}());