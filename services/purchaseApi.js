(function(){

	'use strict';
    
    angular
		.module('app')
		.factory('purchaseApi', purchaseApi);
		
	purchaseApi.$inject = ['$http', '$q'];
		
	function purchaseApi($http, $q) {
	
		$http.defaults.headers.common = {"Accept": "application/json"}; 
		$http.defaults.headers.common = {"Content-Type": "application/json"}; 
		var deferred = $q.defer();
		var apiBaseUrl = "http://mendesticketsapi.azurewebsites.net/api/";

		var service = {
			makePayment: makePayment,
			makePaymentWithCreditCardToken: makePaymentWithCreditCardToken
		};

		return service;

		////////////

		function makePayment(purchaseInfo) {
			
			var deferred = $q.defer();

            $http.post(apiBaseUrl + "Payment", purchaseInfo)
                .success(function(data){
                    deferred.resolve(data);
                })
                .error(function(data){
                    deferred.reject(data);
                });

            return deferred.promise;
			
		}
		
		function makePaymentWithCreditCardToken(purchaseWithTokenCreditCardInfo) {
			
			var deferred = $q.defer();

            $http.post(apiBaseUrl + "Payment?instantBuy", purchaseWithTokenCreditCardInfo)
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