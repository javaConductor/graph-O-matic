
// **************************************************************************
// Copyright 2007 - 2008 The JSLab Team, Tavs Dokkedahl and Allan Jacobs
// Contact: http://www.jslab.dk/contact.php
//
// This file is part of the JSLab Standard Library (JSL) Program.
//
// JSL is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 3 of the License, or
// any later version.
//
// JSL is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.
// ***************************************************************************
// File created 2009-01-30 12:00:25

// Copy an array
Array.prototype.copy =
    function() {
        return [].concat(this);
    };

// Return elements which are in A but not in arg0 through argn
Array.prototype.diff =
    function() {
        var a1 = this;
        var a = a2 = null;
        var n = 0;
        while(n < arguments.length) {
            a = [];
            a2 = arguments[n];
            var l = a1.length;
            var l2 = a2.length;
            var diff = true;
            for(var i=0; i<l; i++) {
                for(var j=0; j<l2; j++) {
                    if (a1[i] === a2[j]) {
                        diff = false;
                        break;
                    }
                }
                diff ? a.push(a1[i]) : diff = true;
            }
            a1 = a;
            n++;
        }
        return a.unique();
    };

// Check whether n number of arrays are disjoint
Array.prototype.disjoint =
    function() {
        var args = [];
        var l = arguments.length;
        if (!l)
            return true;
        for(var i=0; i<l; i++)
            args.push(arguments[i]);
        return Array.prototype.intersect.apply(this,args).length > 0 ? false : true;
    };

// Compute the intersection of n arrays
Array.prototype.intersect =
    function() {
        if (!arguments.length)
            return [];
        var a1 = this;
        var a = a2 = null;
        var n = 0;
        while(n < arguments.length) {
            a = [];
            a2 = arguments[n];
            var l = a1.length;
            var l2 = a2.length;
            for(var i=0; i<l; i++) {
                for(var j=0; j<l2; j++) {
                    if (a1[i] === a2[j])
                        a.push(a1[i]);
                }
            }
            a1 = a;
            n++;
        }
        return a.unique();
    };

// Apply each member of the array as the first argument to the function f
Array.prototype.mapFunction =
    function(f) {
        var l = this.length;
        for(var i=0; i<l; i++)
            f(this[i]);
    };

// Apply the method m to each member of an array
Array.prototype.mapMethod =
    function(m) {
        var a = [];
        for(var i=1; i<arguments.length; i++)
            a.push(arguments[i]);
        var l = this.length;
        for(var i=0; i<l; i++)
            m.apply(this[i],a);
    };

// Pad an array to given size with a given value
Array.prototype.pad =
    function(s,v) {
        var l = Math.abs(s) - this.length;
        var a = [].concat(this);
        if (l <= 0)
            return a;
        for(var i=0; i<l; i++)
            s < 0 ? a.unshift(v) : a.push(v);
        return a;
    };

// Randomize elements in an array
Array.prototype.randomize =
    function(ru) {
        if (!ru)
            this.sort(function(){return ((Math.random() * 3) | 0) - 1;});
        else {
            var a = [].concat(this);
            var l = this.length;
            var al = n = 0;
            for(var i=0; i<l; i++) {
                al = a.length;
                // Get random integer in [0,a.length-1]
                n = Math.floor((Math.random() * al));
                // Copy random element from a to this
                this[i] = a[n];
                // If n was last element in a just pop a[n]
                if (n == al - 1)
                    a.pop();
                // Else copy last element from a to n and pop last element from a
                else {
                    a[n] = a[al - 1];
                    a.pop();
                }
            }
        }
    };

// Remove values from an array optionally using a custom function
Array.prototype.remove =
    function(f) {
        if (!f)
            f = function(i) {return i == undefined || i == null ? true : false;};
        var l = this.length;
        var n = 0;
        for(var i=0; i<l; i++)
            f(this[i]) ? n++ : this[i-n] = this[i];
        this.length = this.length - n;
    };

// Get the union of n arrays
Array.prototype.union =
    function() {
        var a = [].concat(this);
        var l = arguments.length;
        for(var i=0; i<l; i++) {
            a = a.concat(arguments[i]);
        }
        return a.unique();
    };

// Return new array with duplicate values removed
Array.prototype.unique =
    function() {
        var a = [];
        var l = this.length;
        for(var i=0; i<l; i++) {
            for(var j=i+1; j<l; j++) {
                // If this[i] is found later in the array
                if (this[i] === this[j])
                    j = ++i;
            }
            a.push(this[i]);
        }
        return a;
    };

