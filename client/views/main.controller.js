/**
 * Created by yangyang on 3/31/16.
 */
(function () {
    angular
        .module("LoginApp")
        .controller("MainController", MainController);

    function MainController($scope, $localStorage, Auth, $rootScope,$sce) {
        $scope.token = $localStorage.token;
        $scope.tokenClaims = Auth.getTokenClaims();

        function successAuth($scope, token) {
            $localStorage.token = token;
            $scope.token = $localStorage.token;
            window.location = "#/dashboard";
        }

        $scope.signin = function (formData) {
            console.log(formData);
            Auth.signin(formData)
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.success) {
                        console.log("login successfully!");
                        var token = response.data.token;
                        console.log('JWT:', token);
                        successAuth($scope, token);
                        console.log("scope token = ", $scope.token);
                    }
                    else {
                        $scope.pdErrorMsg = response.data.error;
                    }
                });
        };

        $scope.getCodeByEmail = function (email) {
            console.log(email);
            Auth.getCodeByEmail(email)
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.success) {
                        console.log("get email code successfully!");
                    }
                    else {
                        $scope.emlErrorMsg = response.data.error;
                    }
                });
        }

        $scope.signup = function () {
            var formData = {
                email: $scope.email,
                password: $scope.password
            };

            Auth.signup(formData, successAuth, function (res) {
                $rootScope.error = res.error || 'Failed to sign up.';
            })
        };

        $scope.logout = function () {
            console.log("logout clicked");
            Auth.logout();
            $scope.tokenClaims = {};
            delete $scope.token;
            console.log("scope token = ", $scope.token);
        };

        $scope.loginBySocialMedia = function(method) {
            console.log(method);
            Auth.loginBySocialMedia(method)
                .then(function(response) {
                    console.log(response.data);
                });
        }

        $scope.renderHtml = function (html_code) {
            return $sce.trustAsHtml(html_code);
        }


    }
})();