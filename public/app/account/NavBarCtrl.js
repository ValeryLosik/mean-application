angular.module('app').controller('navBarCtrl', function ($scope, $http, mNotifier, mIdentity, mAuth) {
    $scope.identity = mIdentity;
    $scope.signin = function (username, password) {
        mAuth.authenticateUser(username, password).then(function(success){
            if(success){
                mNotifier.notify('Login is successful!');
            }
            else {
                mNotifier.notify('Combination password/username is invalid');
            }
        });
    };
});