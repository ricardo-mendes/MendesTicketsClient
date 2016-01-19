(function(){

	'use strict';
    
    angular
		.module('app')
		.factory('baseApi', baseApi);
		
	baseApi.$inject = ['$http', '$q'];
		
	function baseApi($http, $q) {
	
		var accessToken = "accessToken";

		var service = {
			userIsAuthenticated: userIsAuthenticated,
			setValueInAccessTokenCookie: setValueInAccessTokenCookie,
			getAccessTokenCookie: getAccessTokenCookie,
			deleteCookie: deleteCookie
		};

		return service;

		////////////

		function userIsAuthenticated() {
			return checkCookie();
		}
		
		function setValueInAccessTokenCookie(value) {
			var date = new Date();
			date.setTime(date.getTime() + (30*24*60*60*1000));
			var expires = "expires="+date.toUTCString();
			document.cookie = accessToken + "=" + value + "; " + expires;
		}

		function checkCookie() {
			var accessToken = getAccessTokenCookie();
			if (accessToken != "") {
				return true;
			} else {
				return false;
			}
		}
		
		function getAccessTokenCookie() {
			var name = accessToken + "=";
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1);
				if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
			}
			return "";
		}
		
		function deleteCookie() {
			if (getAccessTokenCookie()) {
              document.cookie = accessToken + "=" +
              "; expires=Thu, 01-Jan-70 00:00:01 GMT";
			}
		}
		
	}	
    
}());