(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());
    
    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                	templateUrl: 'app/goods/goods.html',
                    title: 'Your shop',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-home"></i> Your shop'
                    }
                }
            }, {
                url: '/reg',
                config: {
                	title: 'Join the shop',
                    templateUrl: 'app/reg/reg.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-sign-in"></i> Join the shop'
                    }
                }
            }, {
            	url: '/comment',
            	config: {
            		title: 'Your comments',
            		templateUrl: 'app/comment/comment.html',
            		settings: {
            			nav: 2,
            			content: '<i class="fa fa-bullhorn"></i> Your comments'
            		}
            	}
            }
        ];
    }
})();