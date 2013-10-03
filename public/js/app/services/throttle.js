'use strict';

(function (services) {
    console.log("services/throttle.js");

    services.factory('throttle', [ 'ConstantsService', '$timeout', function ( constants, timeout) {
        console.log("services/throttle.js - services:"+JSON.stringify(services));
        /// return the util funcs
        var factory = this;
        var printLastVal = function (x) {
            console.log(x);
        };

        var tryItOut = function () {
            var ff = fDelayAndCollapse(printLastVal, 750, fCompose4Test);
            for (var i = 0; i != 50; ++i) {
                ff(i);
            }
        };

        var fCompose4Test = function (callObj, newCallObj) {
            // args => [searchStr]
            return { f: callObj.f, args: newCallObj.args }
        };

        var fCompose4Search = function (callObj, newCallObj) {
            // args => [searchStr]
            var ff = callObj.f = newCallObj.f;
            var arg = newCallObj.args[0];
            return { f: ff, args: [arg] }
        };

        var  fCompose4ItemMovement = function (callObj, newCallObj) {
            /// args => [vitemId, x,y]
            return  {f: callObj.f, args: [newCallObj.args[0], callObj.args[1], callObj.args[2]] }
        };

        this.fDelayAndCollapse = function fDelayAndCollapse(fOrig, delayMs, fArgCompose) {
            /// Initialize the Call Obj
            this.theCall = {};
            this.theCall.f = fOrig;
            this.theCall.args = [];
            this.callCount = 0;
            var self = this;

            var setTimer = function(){
                // Start the count
                self.timeoutID = window.setTimeout(function(msg) {
                    if (self.callCount){
                        console.log("calling orig function");
                        self.theCall.f.apply(null, self.theCall.args);
                        self.callCount = 0;
                    }
                }, delayMs, "throttling call!");
            };
            var clearTimer = function(){
                window.clearTimeout(self.timeoutID);
            }
//            this.thePromise = timeout(function () {
//                console.log("calling orig function");
//                self.theCall.f(f.args);
//                //self.thePromise = undefined;
//            }, ( delayMs), true);//timeout        }
            setTimer();
            return function () {
                console.dir(arguments);
                clearTimer();
                self.callCount++;
                    //timeout.cancel(self.thePromise);
                self.theCall = fArgCompose(self.theCall, {f: fOrig, args: arguments});
                setTimer();
                console.log("cancelling the timeout");
            }
        };// fDelayAndCollapse()
        return {
            "delay": this.fDelayAndCollapse
        };
    }]);

})(angular.module('graph-O-matic-services'));
