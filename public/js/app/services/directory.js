/**
 * Spacely Text & Binary Goods Inc.
 *
 * User: lcollins
 * Date: 9/24/13
 * Time: 6:33 PM
 *
 */

(function (services) {

    console.log("services/directives.js");
    services.factory('Directory', ['$http', '$location','ConfigService', function ($http, $location, config) {
        /// send to server for the directory: Map(k.v)
        var urlPrefix = "http://" + config.dataHost + "/";
        console.log("services/directives.js - services:"+JSON.stringify(services));

        var dirUrl = urlPrefix + "directory";
        var thiz = this;
        this.directoryEntries = {};

        return {
            entries: function () {
                return thiz.directoryEntries;
            },
            prefix: function () {
                return urlPrefix;
            }
        }
    }]);

})(angular.module('GraphOMaticServices'));
