(function(){

	'use strict';
    
    angular
		.module('app')
		.factory('loginApi', loginApi);
		
	loginApi.$inject = ['$http', '$q'];
		
	function loginApi($http, $q) {
		
		$http.defaults.headers.common = {"Accept": "application/json"}; 
		$http.defaults.headers.common = {"Content-Type": "application/json"}; 
		var deferred = $q.defer();
		var apiBaseUrl = "http://mendesticketsapi.azurewebsites.net/api/";

		var service = {
			login: login
		};

		return service;

		////////////

		function login(user) {
			
			var deferred = $q.defer();

            $http.post(apiBaseUrl + "User?login", user)
                .success(function(data){
                    deferred.resolve(data);
                })
                .error(function(data){
                    deferred.reject(data);
                });

            return deferred.promise;
			
		};
		
	}	
    
}());