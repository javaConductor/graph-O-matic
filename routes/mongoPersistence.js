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
        getView: function(viewId, f){},
        removeViewItem: function(viewItem, f){},

        removeView: function(viewId, f){},
        saveView: function(theView, f){   },
        createViewItem: function(theViewItem, f){},
        saveViewItem: function(viewItem, f){}

    };
};

exports.api = new Api(db);
