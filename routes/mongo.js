s WebStorm.
 * User: lee
 * Date: 4/9/13
 * Time: 1:01 AM
 */
 
 // get connetion strings
 
 var config = require("/config.js");
 var usrpswd = config.username + ":" + config.password;
var db = require("mongojs")(usrpswd+"@"+config.dbHost+"/"+config.dbName, 
  ['ItemTypes','RelationshipTypes',
	'Items','Relationships', 
	'ItemCategories','RelationshipCategories']);
function Api(db)  {
	var thiz = this;
	return {

