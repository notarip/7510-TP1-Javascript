var assert = require("assert");

var fs = require('fs');
var vm = require('vm');
var path = "src/app.js";
var code = fs.readFileSync(path);
vm.runInThisContext(code);


describe("checkFactOk",function(){
    it('testing fact checker',function(){
        var fact = "varon(juan)";
        assert.equal(checkFact(fact), true);
    })
});


describe("checkFactMultiParamOk",function(){
    it('testing fact multi param checker',function(){
        var fact = "hermano(juan,pepe)";
        assert.equal(checkFact(fact), true);
    })
});


describe("checkFactParamWrong",function(){
    it('testing fact multi param checker',function(){
        var fact = "hermano(juan";
        assert.equal(checkFact(fact), false);
    })
});


describe("checkFactMultiParamWrong02",function(){
    it('testing fact multi param checker',function(){
        var fact = "hermano(juan,pepe";
        assert.equal(checkFact(fact), false);
    })
});

describe("checkFactMultiParamWrong01",function(){
    it('testing fact multi param checker',function(){
        var fact = "hermano(juan,pepe):-";
        assert.equal(checkFact(fact), false);
    })
});

describe("checkRuleOk",function(){
    it('testing rule checker',function(){
        var rule = "padres(X,Y,Z):-padre(X,Z),madre(Y,Z)";
        assert.equal(checkRule(rule), true);
    })
});

describe("checkRuleWrong01",function(){
    it('testing rule checker',function(){
        var rule = "padres(X,Y,Z):padre(X,Z),madre(Y,Z)";
        assert.equal(checkRule(rule), false);
    })
});

describe("checkRuleWrong02",function(){
    it('testing rule checker',function(){
        var rule = "padres(X,Y,Z):-padre(X,Z,madre(Y,Z)";
        assert.equal(checkRule(rule), false);
    })
});

describe("checkRuleWrong03",function(){
    it('testing rule checker',function(){
        var rule = "padres(X,Y,Z)-padre(X,Z),madre(Y,Z)";
        assert.equal(checkRule(rule), false);
    })
});
