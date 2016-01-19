(function(){
    
    var app = angular.module("app", ["ngRoute"]);  
    
    app.config(function($routeProvider){
        $routeProvider
            .when("/home", {
                templateUrl: "home.html",
                controller: "HomeController"
            }) 
            .when("/login", {
                templateUrl: "login.html",
                controller: "LoginController"
            }) 
			.when("/register", {
                templateUrl: "register.html",
                controller: "RegisterController"
            }) 
			.when("/purchase/:price", {
                templateUrl: "purchase.html",
                controller: "PurchaseController"
            }) 
            .otherwise({redirectTo:"/home"});
    });
    
}());

/*
.when("/user/:username", {  /
                templateUrl: "user.html",
                controller: "UserController"
            })
*/