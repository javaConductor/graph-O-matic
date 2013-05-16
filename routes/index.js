
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Graph-O-Matic' });
};

exports.testViewItem = function(req, res){
	res.render('testViewItem', { title: 'Graph-O-Matic Item Test Page' });
};

exports.testView = function(req, res){
	res.render('testView', { title: 'Graph-O-Matic View Test Page' });
};
