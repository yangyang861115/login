/**
 * Created by yangyang on 3/2/16.
 */
(function () {
    angular
        .module("LoginApp")
        .config(configuration)
        .run(restrict);

    function configuration($routeProvider, $httpProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.html",
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/dashboard", {
                templateUrl: "views/dashboard/dashboard.view.html",
            })
            .when("/lesson", {
                templateUrl: "views/lesson/lesson.view.html",
                controller: "LessonController",
                controllerAs: "model"
            })
            .when("/lesson/:study/:lesson/:page", {
                templateUrl: "views/lesson/lesson.view.html",
                controller: "LessonController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/"
            });

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        delete $localStorage.token;
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }

    function restrict ($rootScope, $location, $localStorage) {
        $rootScope.$on( "$routeChangeStart", function(event, next) {
            if ($localStorage.token == null) {
                if ( next.templateUrl === "views/dashboard/dashboard.view.html") {
                    $location.path("/login");
                }
            }else {
                if ( next.templateUrl === "views/login/login.view.html") {
                    $location.path("/dashboard");
                }
            }
        });
    }
})();
