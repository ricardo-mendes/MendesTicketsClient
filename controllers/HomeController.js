
(function() {

	'use strict';
	
    angular
		.module('app')
		.controller('HomeController', HomeController);
		
	HomeController.$inject = ['$scope', '$location', 'menuApi', 'baseApi', 'purchaseApi'];
		
	function HomeController($scope, $location, menuApi, baseApi, purchaseApi) { 
		
		$scope.userIsAuthenticated = baseApi.userIsAuthenticated();
		$scope.showLoading = false;
			
		$scope.event = {
				title: '',
				description: '',
				image:'',
				price: 0
			};
			
		$scope.purchaseWithTokenCreditCardInfo = {
			acessTokenId: baseApi.getAccessTokenCookie(),
			amountInCents: 0,
			installmentCount: 1
		};
			
		$scope.events = [
				{title: 'Star Wars - O Despertar da Força', description: 'Novo filme da série de Star Wars', image:'img/star_wars.png', price: 40}, 
				{title: 'Vingadores: Era de Ultron', description: 'Segundo filme dos Vingadores', image:'img/vingadores.png', price: 30}, 
				{title: 'Guardiões da Galaxia', description: 'Filme dos guardiões da galaxia', image:'img/guardiões_da_galaxia.png', price: 20}, 
				{title: 'Batman x Superman', description: 'Filme que o Batman enfrenta o Superman', image:'img/batman_v_superman.png', price: 1500}];
				
				
		$scope.makePaymentWithCreditCardToken = function(price) {
			
			$scope.showLoading = true;
			$scope.purchaseWithTokenCreditCardInfo.amountInCents = price;
			
            purchaseApi.makePaymentWithCreditCardToken($scope.purchaseWithTokenCreditCardInfo)
            .then(
                function(data){
					alert("Compra efetuada com sucesso!");
                    $scope.showLoading = false;
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