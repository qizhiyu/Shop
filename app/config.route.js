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
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Shop'
                    }
                }
            }, {
                url: '/admin',
                config: {
                	title: 'Register',
                    templateUrl: 'app/admin/admin.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Register'
                    }
                }
            }, {
            	url: '/comment',
            	config: {
            		title: 'comment',
            		templateUrl: 'app/comment/comment.html',
            		settings: {
            			nav: 2,
            			content: '<i class="fa fa-lock"></i> Comment'
            		}
            	}
            }
        ];
    }
})();