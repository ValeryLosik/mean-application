angular.module('app').controller('mUserListCtrl', function ($scope, mUser) {
    $scope.users = mUser.query();
});