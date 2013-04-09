/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 4/9/13
 * Time: 1:01 AM
 */

function Api(db)  {
	var thiz = this;
	return {
		getItems : function(req, res){
				db.getItems( function (err, itemList) {
					if (err) {
						res.send( {errorMsg: err} );
					}
					else {
						res.send( {items: itemList} );
					}
				});
		},

	}
}


exports.getItems = function (req, res) {
	var vr = db.req2Vr(req);
	db.saveVr(vr, function (err, savedVr, vrList, relDefList) {
		if (err) {
			res.send({errorMsg: err});
		}
		else {
			res.send({vr: savedVr});
		}
	});
};
