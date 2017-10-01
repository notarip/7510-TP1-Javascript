var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


beforeEach(function () {
    interpreter = new Interpreter();
    interpreter.parseDB(interpreter.loadDB(true));

    interpreterWrong = new Interpreter();
    interpreterWrong.parseDB(interpreterWrong.loadDB(false));

});


describe("checkFactOk",function(){
    it('testing fact checker',function(){
        var fact = "varon(juan)";
        assert.equal(interpreter.checkFact(fact), true);
    })
});


describe("checkFactMultiParamOk",function(){
    it('testing fact multi param checker',function(){
        var fact = "hermano(juan,pepe)";
        assert.equal(interpreter.checkFact(fact), true);
    })
});


describe("checkFactParamWrong",function(){
    it('testing fact multi param checker',function(){
        var fact = "hermano(juan";
        assert.equal(interpreter.checkFact(fact), false);
    })
});


describe("checkFactMultiParamWrong02",function(){
    it('testing fact multi param checker',function(){
        var fact = "hermano(juan,pepe";
        assert.equal(interpreter.checkFact(fact), false);
    })
});

describe("checkFactMultiParamWrong01",function(){
    it('testing fact multi param checker',function(){
        var fact = "hermano(juan,pepe):-";
        assert.equal(interpreter.checkFact(fact), false);
    })
});

describe("checkRuleOk",function(){
    it('testing rule checker',function(){
        var rule = "padres(X,Y,Z):-padre(X,Z),madre(Y,Z)";
        assert.equal(interpreter.checkRule(rule), true);
    })
});

describe("checkRuleWrong01",function(){
    it('testing rule checker',function(){
        var rule = "padres(X,Y,Z):padre(X,Z),madre(Y,Z)";
        assert.equal(interpreter.checkRule(rule), false);
    })
});

describe("checkRuleWrong02",function(){
    it('testing rule checker',function(){
        var rule = "padres(X,Y,Z):-padre(X,Z,madre(Y,Z)";
        assert.equal(interpreter.checkRule(rule), false);
    })
});

describe("checkRuleWrong03",function(){
    it('testing rule checker',function(){
        var rule = "padres(X,Y,Z)-padre(X,Z),madre(Y,Z)";
        assert.equal(interpreter.checkRule(rule), false);
    })
});
