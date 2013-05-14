
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Graph-O-Matic' });
};

exports.testViewItem = function(req, res){
	res.render('testViewItem', { title: 'Graph-O-Matic' });
};
