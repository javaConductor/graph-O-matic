s WebStorm.
 * User: lee
 * Date: 4/9/13
 * Time: 1:01 AM
 */
 
 // get connetion strings
 

var api = function Api(db)  {
	var thiz = this;
    var config = require("/config.js");
    var usrpswd = config.username + ":" + config.password;
    var db = require("mongojs")(usrpswd+"@"+config.dbHost+"/"+config.dbName,
        ['ItemTypes','RelationshipTypes',
            'Items','Relationships',
            'ItemCategories','RelationshipCategories',
            'Views'
        ]);
	var ItemTypes = db.ItemTypes;
	var RelationshipTypes = db.RelationshipTypes;
	var Items = db.Items;
	var Relationships = db.Relationships;
	var ItemCategories = db.ItemCategories;
	var RelationshipCategories = db.RelationshipCategories;
	var Views = db.Views;

	return {
	
		allItems : function allItems(f){
            db.Items.find({}, function(err, items){
                f(err, items);
            });
		},

        getItem : function(itemId, f){
        },
        removeItem: function(itemId, f){},

        saveItem: function (item, f) {
        },

        getRelatedItems : function(itemId, relationshipType, f){
        },

        getItemCategory: function(categoryId, f){},
        getItemCategories: function(f){},
        getRelationshipCategory: function(categoryId, f){},
        getRelationshipCategories: function(f){},
        getView: function(viewId, f){
	        /// we must get the ViewItems and de-reference the Item and add it to the ViewItem
	        Views.find({id: viewId}, function(err, view){
		        // now we must add the item to the ViewItem
		        Items.find({id: {$in: view.itemIdList }}, function(err, items){
			        if(err)
			            return f(err,null);
			        // now put them together
			        view.items.forEach(function(vitem){
				        items.forEach(function(item){
					        if(vitem.itemId==item.id){
						        vitem.item = item;
					        }
				        });
			        });
			        view.itemIdList = null;
					f(null, view);
		        });

	        });



        },
        removeViewItem: function(viewItem, f){},

        removeView: function(viewId, f){},
        saveView: function(theView, f){   },
        createViewItem: function(theViewItem, f){},
        saveViewItem: function(viewItem, f){}

    };
};

exports.api = new Api(db);
