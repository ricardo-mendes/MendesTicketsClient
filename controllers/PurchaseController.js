
(function() {

	'use strict';

    angular
		.module('app')
		.controller('PurchaseController', PurchaseController);
		
	PurchaseController.$inject = ['$scope', '$location', '$routeParams', 'menuApi', 'purchaseApi' ,'baseApi'];	
		
	function PurchaseController($scope, $location, $routeParams, menuApi, purchaseApi, baseApi) { 
		
		
		if(!(baseApi.userIsAuthenticated())){
			$location.path("/home");
		}
		
		$scope.showLoading = false;
		
		$scope.purchaseInfo = {
			acessTokenId: baseApi.getAccessTokenCookie(),
			isSavingCreditCardInToken: false,
			amountInCents: $routeParams.price,
			creditCardNumber: '',
			creditCardBrand: 0,
			expMonth: 0,
			expYear: 0,
			securityCode: '',
			holderName: '',
			installmentCount: 1
		};
		
		$scope.makePayment = function() {
			
			$scope.showLoading = true;
			
            purchaseApi.makePayment($scope.purchaseInfo)
            .then(
                function(data){
					alert("Compra efetuada com sucesso!");
                    $location.path("/home");
                },
                function(data){
                    alert(data.error);
					$scope.showLoading = false;
                }
            );
		}
		
		$scope.deleteAccessToken = function() {

            menuApi.deleteAccessToken($scope.purchaseWithTokenCreditCardInfo.acessTokenId)
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