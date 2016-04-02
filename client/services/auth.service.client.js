/**
 * Created by yangyang on 3/31/16.
 */
(function () {
    angular
        .module("LoginApp")
        .factory('Auth', auth);
    function auth($http, $localStorage) {

        var tokenClaims = getClaimsFromToken();
        var api = {
            signup: signup,
            signin: signin,
            loginBySocialMedia: loginBySocialMedia,
            logout: logout,
            getCodeByEmail: getCodeByEmail,
            getTokenClaims: getTokenClaims,
            getToken:getToken
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getClaimsFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        function signup(data, success, error) {
            var url = "no url yet";
            $http.post(url, data).success(success).error(error)
        }

        function signin(data, success, error) {
            var url = "https://crucore.com/api.php?a=login";
            return $http.post(url, data);
        }

        function loginBySocialMedia(method){
            var url = "https://crucore.com/index.php?a=social_" + method;
            return $http.get(url);
        }

        function logout() {
            tokenClaims = {};
            delete $localStorage.token;
            window.location = "#/";
        }

        function getTokenClaims() {
            return tokenClaims;
        }

        function getToken() {
            return $localStorage.token;
        }

        function getCodeByEmail(email) {
            var url = "https://crucore.com/api.php?a=sendEmail";
            return $http.post(url, email);
        }
        return api;
    }

})();