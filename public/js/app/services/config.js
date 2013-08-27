/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 7/5/13
 * Time: 1:12 AM
 */
(function (services) {

    var configObj = {
        dataHost: "localhost:4242"
    };

    services.factory('ConfigService', [ function () {
        return configObj;

    }]);

})(angular.module('GraphOMaticServices'));
