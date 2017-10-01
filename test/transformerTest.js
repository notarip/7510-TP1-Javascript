var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');
beforeEach(function () {
    interpreter = new Interpreter();
    interpreter.parseDB(interpreter.loadDB(true));
});


describe("TransformeRule",function(){
    it('should return a rule transformed ',function(){
        var rule = "padres(X,Y,Z):-padre(X,Z),madre(Y,Z))";
        var transformedRule = { name: 'padres', facts: [ 'padre(0,2)', 'madre(1,2)' ] };
        assert.deepEqual(interpreter.transformRule(rule), transformedRule);
    })
});
