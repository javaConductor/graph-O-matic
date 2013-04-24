/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 4/23/13
 * Time: 7:04 PM
 */
var assert = require("assert")
describe('Array', function(){
	describe('#indexOf()', function(){
		it('should return -1 when the value is not present', function(){
			assert.equal(-1, [1,2,3].indexOf(5));
			assert.equal(-1, [1,2,3].indexOf(0));
		})
	})
})

