/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 4/23/13
 * Time: 7:04 PM
 */

describe('Throttle', function () {
    var mock;
    var f2Delay = function () {
    };
    beforeEach(module('graphOmatic'));

    it('should inject service', inject(function(throttle) {
        expect(throttle).not.toBeNull();
    }));

    it('should not call the original function if proxy not called.', inject(function(throttle) {
        console.log("it(1)");

        var x = 100;
        var tmp={
            updateX : function (newVal) {
                console.log("updateX => "+newVal);
                x = newVal;
//                expect(x).toBe(159);
            }
        };
        spyOn(tmp,"updateX");
        runs(function(){
            var nuUpdate = throttle.delay(tmp.updateX, 100, function (oldCall, nuCall) {
                console.log("Composing "+JSON.stringify(oldCall)+" with "+ JSON.stringify(nuCall));
                return {f: oldCall.f, args: nuCall.args}
            });
        });

        waits(100);

        runs(function(){
            expect(tmp.updateX).not.toHaveBeenCalled();
//            expect(tmp.updateX).toHaveBeenCalledWith(133);
        });
    }));

    it('should call with the last call values', inject(function(throttle) {
        console.log("it(1)");

        var x = 100;
        var tmp={
            updateX : function (newVal) {
                console.log("updateX => "+newVal);
                x = newVal;
//                expect(x).toBe(159);
            }
        };
        spyOn(tmp,"updateX");
        runs(function(){
            var nuUpdate = throttle.delay(tmp.updateX, 100, function (oldCall, nuCall) {
                console.log("Composing "+JSON.stringify(oldCall)+" with "+ JSON.stringify(nuCall));
                return {f: oldCall.f, args: nuCall.args}
            });
            nuUpdate(100);
            nuUpdate(102);
            nuUpdate(158);
            nuUpdate(669);
            nuUpdate(179);
            nuUpdate(133);
        });

        waits(500);

        runs(function(){
            expect(tmp.updateX).toHaveBeenCalled();
            expect(tmp.updateX).toHaveBeenCalledWith(133);
        });
    }));

    it('should call with the last call values twice', inject(function(throttle) {
        console.log("it(1)");

        var x = 100;
        var tmp={
            updateX : function (newVal) {
                console.log("updateX => "+newVal);
                x = newVal;
//                expect(x).toBe(159);
            }
        };
        var nuUpdate;
        spyOn(tmp,"updateX");
        runs(function(){
            nuUpdate = throttle.delay(tmp.updateX, 100, function (oldCall, nuCall) {
                console.log("Composing "+JSON.stringify(oldCall)+" with "+ JSON.stringify(nuCall));
                return {f: oldCall.f, args: nuCall.args}
            });
            nuUpdate(100);
            nuUpdate(102);
            nuUpdate(158);
            nuUpdate(669);
            nuUpdate(179);
            nuUpdate(133);
        });

        waits(100);

        runs(function(){
            expect(tmp.updateX).toHaveBeenCalled();
            expect(tmp.updateX.calls.length).toEqual(1);
            expect(tmp.updateX).toHaveBeenCalledWith(133);
        });

        runs(function(){
            nuUpdate(1020);
            nuUpdate(1580);
            nuUpdate(6697);
        });

        waits(100);

        runs(function(){
            expect(tmp.updateX).toHaveBeenCalled();
            expect(tmp.updateX.calls.length).toEqual(2);
            expect(tmp.updateX).toHaveBeenCalledWith(6697);
        });

    }));
        it('should call once ', inject(function(throttle) {
            console.log("it(1)");

            var x = 100;
            var tmp={
                updateX : function (newVal) {
                    console.log("updateX => "+newVal);
                    x = newVal;
//                expect(x).toBe(159);
                }
            };
            var nuUpdate;
            spyOn(tmp,"updateX");
            runs(function(){
                nuUpdate = throttle.delay(tmp.updateX, 100, function (oldCall, nuCall) {
                    console.log("Composing "+JSON.stringify(oldCall)+" with "+ JSON.stringify(nuCall));
                    return {f: oldCall.f, args: nuCall.args}
                });
                nuUpdate(100);
                nuUpdate(102);
                nuUpdate(158);
                nuUpdate(669);
                nuUpdate(179);
                nuUpdate(133);
            });

            waits(100);

            runs(function(){
                expect(tmp.updateX).toHaveBeenCalled();
                expect(tmp.updateX.calls.length).toEqual(1);
                expect(tmp.updateX).toHaveBeenCalledWith(133);
            });
            waits(110);
            runs(function(){
                expect(tmp.updateX.calls.length).toEqual(1);
                expect(tmp.updateX).toHaveBeenCalledWith(133);
            });

        }));//it





    //}));

});
