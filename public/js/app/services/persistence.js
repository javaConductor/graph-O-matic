(function (services) {
    console.log("services/persistence.js");

    /**
	 * This service is responsible for reading and writing to and from the server in graph-O-matic (c)
	 *
	 *
	 */

	services.factory('persistence', ['$http', '$resource', 'Directory','$q', function ($http, $resource, restDirectory,q) {
        console.log("services/persistence.js - services:"+JSON.stringify(services));
		var prefix =  "http://localhost:4242/";//restDirectory.prefix();
        var View = $resource(prefix + 'views/:id', {alt:'json',  id: '@id'},
            {
                create: {
                    method: "PUT",
                    url: prefix + 'views',
                    data: {
                        name: "@name",
                        typeName: "@typeName"
                    }
                }
            }

        );
        var Item = $resource(prefix + 'items/:id', { callback:'JSON_CALLBACK', id: '@id'});
        var ItemData = $resource(prefix + 'item-data/:id', { callback:'JSON_CALLBACK', id: '@id'});
        var ViewItem = $resource(prefix + 'view-items/:id',{alt:'json', callback:'JSON_CALLBACK'}, {id: '@id'});
        var ViewType = $resource(prefix + 'view-types/:id',{alt:'json', callback:'JSON_CALLBACK'}, {id: '@id'});
		var ItemType = $resource(prefix + 'item-types/:id',{alt:'json', callback:'JSON_CALLBACK'}, {id: '@id'});
		var Relationship = $resource(prefix + 'relationships/:id',{alt:'json', callback:'JSON_CALLBACK'}, {id: '@id'});
        var RelationshipType = $resource(prefix + 'relationship-types/:id',{alt:'json', callback:'JSON_CALLBACK'}, {id: '@id'});

		return {

 			getItem: function (itemId) {
				return Item.get({}, {id: itemId})
                    .then(function(itm){
                        return itm;
                    });
			},

 			allItems: function ( ) {
                return $http({
                    method: 'GET',
                    url: prefix + "items"
                })
                .then(function(items){
                        return items;
                });
			},

 			getItemData: function (itemId) {
                return $http({
                    method: 'GET',
                    url: prefix + "item-data/"+itemId
                })
                .then(function(itemData){
                        return ( itemData );
                    })
			},

			removeItem: function (itemId) {
                return Item.delete({id : itemId});
			},

			saveItem: function (item, f) {
				return Item.save({}, item)
                .then(function(saved){
                        return saved;
                    });
			},

			getItemType: function (id) {
			},
			getCategory: function (categoryId, f) {
			},

			getCategories: function (f) {
			},

			getRelationshipType: function (id,  f) {
			},

			getRelationshipTypes: function (f) {
			},

            getPossibleNewRelationshipTypes: function(itemFrom, itemTo, f){
            },

			removeViewItem: function (viewItem, f) {
			},

			removeView: function (viewId, f) {
			},

			createView: function (viewName, viewType, f) {
                console.log("Persistence.createView("+viewName+","+viewType+")");
                var d = q.defer();

                $.ajax({
                    url: prefix + "views/",
                    type: "put",
                    data: {
                        name: viewName,
                        typeName: viewType
                        }
                    })
                    .done(function( data ) {
                        if(f) (f(null, data));
                        d.resolve( data );
                    })
                    .fail(function( jqXHR, textStatus, errorThrown){
                        if(f) (f("Error("+textStatus+"): "+errorThrown));
                        d.reject("Error("+textStatus+"): "+errorThrown);
                    });
                return d.promise;
			},

			saveView: function (viewData ) {
                return $http({
                    method: 'POST',
                    url: prefix + "views/",
                    data:viewData})
                    .then(function(data){
                        return( data );
                    })
                    .catch(function(e){
                        throw Error(e);
                    });
			},

            getView: function (viewId) {

                var d = q.defer();
                $.ajax({
                    url: prefix + "views/"+viewId,
                    type: "get"
                })
                    .done(function( data ) {
                        if(f) (f(null, data));
                        d.resolve( data );
                    })
                    .fail(function( jqXHR, textStatus, errorThrown){
                        if(f) (f('Could not get View: id='+viewId +' ==>>'+ errorThrown));
                        d.reject('Could not get View: id='+viewId +' ==>>'+ errorThrown);
                    });
                return d.promise;
            },

            allViews: function (  ) {
                return $.ajax({
                    url: prefix + "views",
                    type: "get"
                })
                    .done(function( data ) {
                        return ( data );
                    })
                    .fail(function( jqXHR, textStatus, errorThrown){
                        throw ('Could not get Views:  ==>>'+ errorThrown);
                    });
            },

			createViewItem: function (theViewItem, f) {
                console.log("Persistence.createViewItem("+")");
                return $http({
                    method: 'PUT',
                    url: prefix + "view-items/",
                    data: theViewItem
                })
                    .success(function(vi, status, headers, config){
                        return( vi );
                    })
                    .catch(function(e){
                        throw new Error(e);
                    });

			},

			updateViewItem: function (theViewItem, f) {
                console.log("Persistence.updateViewItem("+")");
                return $http({
                    method: 'PUT',
                    url: prefix + "view-items/",
                    data:theViewItem
                })
                    .then(function(vi){
                        return( vi );
                    })
                    .catch(function(e){
                        throw new Error(e);
                    });

            }
		}
	}]);


})(angular.module('graph-O-matic-services'));
