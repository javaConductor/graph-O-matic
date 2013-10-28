(function (services) {
    console.log("services/persistence.js");

    /**
	 * This service is responsible for reading and writing to and from the server in graph-O-matic (c)
	 *
	 *
	 */

	services.factory('persistence', ['$http', '$resource', 'Directory', function ($http, $resource, restDirectory) {
        console.log("services/persistence.js - services:"+JSON.stringify(services));
		var prefix =  "http://localhost:4242/";//restDirectory.prefix();
        var View = $resource(prefix + 'views/:id', {alt:'json',  id: '@id'},
            {
                create: {
                    method: "PUT",
                    url: prefix + 'views/new/:viewName/:viewType',
                    params: {
                        viewName: "@viewName",
                        viewType: "@viewType"
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
                return $http({
                    method: 'PUT',
                    url: prefix + "views/",
                    data:{
                        name: viewName,
                        typeName: viewType}
                })
                    .then(function(data, status, headers, config){
                        return( data );
                    })
                    .catch(function(e){
                        throw Error(e);
                    });
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
                return View.get({}, {id: viewId})
                    .then(function (view) {
                        console.log(['Could not get View: id='+viewId +' ==>>', view] );
                        return view;
                    })
                    .catch (function(err) {
                        console.error('Could not get View: id='+viewId +' ==>>'+ err );
                        throw new Error('Could not get View: id='+viewId +' ==>>'+ err );
                });
            },

            allViews: function (  ) {
                return $http({
                    method: 'GET',
                    url: prefix + "views"
                })
                    .then(function(views){
                        return views;
                    })
            },

			createViewItem: function (theViewItem, f) {
                console.log("Persistence.createViewItem("+")");
                return $http({
                    method: 'PUT',
                    url: prefix + "view-items/",
                    data:theViewItem
                })
                    .then(function(vi){
                        return( vi );
                    })
                    .catch(function(e){
                        throw Error(e);
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
                        throw Error(e);
                    });

            }
		}
	}]);


})(angular.module('graph-O-matic-services'));
