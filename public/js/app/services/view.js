/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 4/24/13
 *
 * Time: 12:08 AM
 */
(function (services) {
    console.log("services/view.js");

    var ViewItemObject = function( view, decoratedViewItem ){
            return {
	            item: decoratedViewItem,
//                is: function (itemType) {
//                },
                position:function(){
                    return decoratedViewItem.position;
                },
                image: function(){
                    /// for now we use the default from the itemType
                  //  decoratedViewItem.image = world.findRelatedImages(decoratedViewItem.item, function(imgItems){
                 //   });
                    return decoratedViewItem.relatedImages && decoratedViewItem.relatedImages [0] ? decoratedViewItem.relatedImages[0] : null;
                },
                title: function(){
                    return decoratedViewItem.title;
                },
                properties:decoratedViewItem.effectiveProperties,
                data: decoratedViewItem.item.data,
                description: decoratedViewItem.description
            };
        };

    /**
     * showViewItem
     *
     * Returns true if the viewItem should be displayed based on the viewOptions.
     * @param item
     * @param viewOptions
     */
    var showViewItem = function showViewItem(item, viewOptions){
    };

    var ViewObject = function View( viewData, ContextEventProcessor, persistence, urlLoader ) {
		/// all initialization done here before we return object
		/// add the types to the items
		//var theItemTypes = world.allItemTypes( viewData.itemIdList );
		//var itemTypesById = util.mapBy("id", theItemTypes);

        var loadViaRestLink = function(propertyName, thing){
            var d = q.defer();
            if( thing["$href"] ){
                var url = thing["$href"];
                urlLoader.get(url).then(function(data){
                    d.resolve(data);
                })
            }else{
                d.resolve(thing);
            }
            return d.promise;
        };

        this.initViewItem= function (viewItem) {
          //  viewItem = this.decorateViewItem( viewItem );
            return ViewItemObject( this, viewItem)
        };




        viewData.items = viewData.items || [];
        //TODO: figure out what to do when referenced items are missing.
		var newItems = viewData.items.filter(function(vi){return vi.item;}).map(function (vitem) {
			return (this.initViewItem(vitem));
		});


		viewData.items = newItems;
	    //var decorators = world.decorator();
		//// REFACTOR: move all non-public methods out of object
		this.id = viewData.id;
        this.name = viewData.name;
        this.items = newItems;

			//"world": world,
			/////////////////////////////////////////////////////////
			// Items
			/////////////////////////////////////////////////////////
            /**
             *
             * Create a viewItem from an Item and a position
             *
             * @param item
             * @param position
             * @returns promise(ViewItem)
             */
			this.createViewItem= function (item, position) {
                /// create item
                return persistence.createViewItem(item, position)
                    .then(function(savedView){
                        // update the View Object
                        return savedView;
                    });
			};
            //// This function decorates a viewItem and
            //// creates a ViewItemObject from it

			this.addItem= function (item, position) {
				return this.createViewItem(item, position )
			};

//			this.populateData=  function (item, f) {
//                    if( item.item.data['$href'] ){
//                        // the data has not been loaded
//                        // we must load it via the $href url
//                        persistence.getItemData(item.id, function(e,d){
//
//                        });
//                    }else{
//
//                    }
//				return this.createViewItem(item)
//			};
			/////////////////////////////////////////////////////////
			// Relationships
			/////////////////////////////////////////////////////////
			this.validRelationship= function (relationshipTypeName, itemFrom, itemTo) {
			};

			this.createRelationship= function (itemFrom, itemTo, relationshipTypeName) {
			};
		return this;
        };
    var xxxViewObject = function View( viewData, ContextEventProcessor, persistence ) {
		/// all initialization done here before we return object
		/// add the types to the items
		//var theItemTypes = world.allItemTypes( viewData.itemIdList );
		//var itemTypesById = util.mapBy("id", theItemTypes);



        var initViewItem= function (viewItem) {
          //  viewItem = this.decorateViewItem( viewItem );
            return ViewItemObject( this, viewItem)
        };

        viewData.items = viewData.items || [];
		var newItems = viewData.items.filter(function(vi){return vi.item;}).map(function (vitem) {
			return (initViewItem(vitem));
		});
		viewData.items = newItems;
	    //var decorators = world.decorator();
		//// REFACTOR: move all non-public methods out of object
		var theObject = {
			'id': viewData.id,
			'name': viewData.name,
            'items': newItems,
			//"world": world,
			/////////////////////////////////////////////////////////
			// Items
			/////////////////////////////////////////////////////////
            /**
             *
             * Create a viewItem from an Item and a position
             *
             * @param item
             * @param position
             * @returns promise(ViewItem)
             */
			createViewItem: function (item, position) {
                /// create item
                return persistence.createViewItem(item, position)
                    .then(function(savedView){
                        // update the View Object
                        return savedView;
                    });
			},
            //// This function decorates a viewItem and
            //// creates a ViewItemObject from it

			addItem: function (item) {
				return this.createViewItem(item)
			},
			populateData:  function (item, f) {
                    if( item.item.data['$href'] ){
                        // the data has not been loaded
                        // we must load it via the $href url
                        persistence.getItemData(item.id, function(e,d){

                        });
                    }else{

                    }


				return this.createViewItem(item)
			},
			/////////////////////////////////////////////////////////
			// Relationships
			/////////////////////////////////////////////////////////
			getPossibleNewRelationships: function (itemFrom, itemTo) {
			},
			itemHasRelationship: function (item, relationshipTypeName) {
			},
			validRelationship: function (relationshipTypeName, itemFrom, itemTo) {
			},

			createRelationship: function (itemFrom, itemTo, relationshipTypeName) {
			}
		};

		return theObject;
        };

	services.factory('GraphView', ['ContextEventProcessor', 'UtilityFunctions','persistence','URLLoader',
		function ( evtProcessor, util, persistence, urlLoader ) {
            //console.log("services/view.js - services:"+JSON.stringify(services));
            return function(viewData){
				return new ViewObject(  viewData, evtProcessor, persistence, urlLoader);
			}
		}]);

})(angular.module('graph-O-matic-services'));
