angular.module('app').factory('mAuth', function ($http, mNotifier, mIdentity, $q, mUser) {
    return {
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http.post('/login', {'username': username, 'password': password}).then(function (response) {
                if (response.data.success) {
                    var user = new mUser();
                    angular.extend(user, response.data.user);
                    mIdentity.currentUser = user;
                    dfd.resolve(true);
                }
                else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        logoutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', {'logout': true}).then(function (response) {
                mIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },
        authorizeCurrentUserForRole: function (role) {
            if(mIdentity.isAuthorized('admin')){
                return true;
            }
            else return $q.reject('not authorized');

        }
    }
});