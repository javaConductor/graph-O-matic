/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 7/5/13
 * Time: 1:12 AM
 */
(function (services) {
    console.log("services/config.js");

    var configObj = {
        dataHost: "localhost:4242"
    };

    services.factory('ConfigService', [ function () {
        console.log("services/config.js - services:"+JSON.stringify(services));
        return configObj;

    }]);

})(angular.module('GraphOMaticServices'));
