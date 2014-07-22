angular.module('app').factory('mUser', function ($resource) {
    var UserResource = $resource('/api/users/');
    UserResource.prototype.isAdmin = function () {
        return this.roles && this.roles.indexOf('admin') > -1;
    }
    return UserResource;
});