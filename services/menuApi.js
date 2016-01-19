(function(){

	'use strict';
    
    angular
		.module('app')
		.factory('menuApi', menuApi);
		
	menuApi.$inject = ['$http', '$q'];
		
	function menuApi($http, $q) {
		
		$http.defaults.headers.common = {"Accept": "application/json"}; 
		$http.defaults.headers.common = {"Content-Type": "application/json"}; 
		var deferred = $q.defer();
		var apiBaseUrl = "http://mendesticketsapi.azurewebsites.net/api/";
	
		var service = {
			deleteAccessToken: deleteAccessToken
		};

		return service;

		////////////

		function deleteAccessToken(accessToken) {
			
			var deferred = $q.defer();

            $http.delete(apiBaseUrl + "AccessToken?accessTokenId="+accessToken)
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