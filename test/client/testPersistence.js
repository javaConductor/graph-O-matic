/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 4/23/13
 * Time: 7:04 PM
 */

describe('Persistence', function () {
    var mock;
    var f2Delay = function () {
    };
    beforeEach(module('graphOmatic'));

    it('should inject service', inject(function(persistence) {
        expect(persistence).not.toBeNull();
    }));

    it('should create and remove view of default type.', inject(function(persistence) {
        console.log("it(1)");
        persistence.createView("newView", null, function(e,v){
            expect(e).toBeNull();
            expect(v).not.toBeNull();
            persistence.removeView(v.id, function(e,resp){
                expect(e).toBeNull();
            })
        });

    }));

});
