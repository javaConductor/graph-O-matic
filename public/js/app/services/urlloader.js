(function (services) {
    console.log("services/persistence.js");

    /**
     * This service is responsible for reading and writing to and from the server in graph-O-matic (c)
     *
     *
     */

    services.factory('URLLoader', ['$http', '$resource', '$q', function ($http, $resource, q) {
        // console.log("services/urlLoader.js - services:" + JSON.stringify(services));

        var prefix = "http://localhost:4242/";//restDirectory.prefix();

        return {

            get: function (url) {
                console.log("URLLoader.get(" + url + ")");
                // var d = q.defer();
                return $.ajax({
                    url: prefix + url,
                    type: "get"
                })
                    .done(function (data) {
                        console.log("Persistence.createView.done(" + JSON.stringify(data) + ")");
                        return( data );
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        console.error("Persistence.createView.fail(" + textStatus + " - " + errorThrown + ")");
                        throw new Error("Error(" + textStatus + "): " + errorThrown);
                    });
                //return d.promise;

            },

            post: function (url, d) {
                console.log("URLLoader.post(" + url + ")");
                // var d = q.defer();
                return $.ajax({
                    url: prefix + url,
                    type: "post",
                    data: d
                })
                    .done(function (data) {
                        console.log("URLLoader.post.done(" + JSON.stringify(data) + ")");
                        return( data );
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        console.error("URLLoader.post.fail(" + textStatus + " - " + errorThrown + ")");
                        throw new Error("Error(" + textStatus + "): " + errorThrown);
                    });
            },

            put: function (url, d) {
                console.log("URLLoader.put(" + url + ")");
                return $.ajax({
                    url: prefix + url,
                    type: "put",
                    data: d
                })
                    .done(function (data) {
                        console.log("URLLoader.put.done(" + JSON.stringify(data) + ")");
                        return( data );
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        console.error("URLLoader.put.fail(" + textStatus + " - " + errorThrown + ")");
                        throw new Error("Error(" + textStatus + "): " + errorThrown);
                    });
            },

            delete: function (url) {
                console.log("URLLoader.delete(" + url + ")");
                return $.ajax({
                    url: prefix + url,
                    type: "delete"
                })
                    .done(function (data) {
                        console.log("URLLoader.delete.done(" + JSON.stringify(data) + ")");
                        return( data );
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        console.error("URLLoader.delete.fail(" + textStatus + " - " + errorThrown + ")");
                        throw new Error("Error(" + textStatus + "): " + errorThrown);
                    });
            }
        };
    }]);

})(angular.module('graph-O-matic-services'));
