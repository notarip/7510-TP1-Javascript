var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');


var fs = require('fs');
var vm = require('vm');
//var path = "src/interpreter.js";
//var code = fs.readFileSync(path);
//vm.runInThisContext(code);
var Interpreter = require('../src/interpreter');


beforeEach(function () {
    interpreter = new Interpreter();
    interpreter.parseDB(interpreter.loadDB(true));

    interpreterWrong = new Interpreter();
    interpreterWrong.parseDB(interpreterWrong.loadDB(false));

});

describe("ParseNiceDB",function(){
    it('should return the db as array',function(){
        var arrayNiceDB = ["varon(juan)","varon(pepe)","padre(juan,pepe)","madre(ana,juan)","padres(X,Y,Z):-padre(X,Z),madre(Y,Z)"];
        assert.deepEqual(interpreter.getDB(), arrayNiceDB);
    })
});

describe("ParseWrongDB",function(){
    it('should return null',function(){
        assert.deepEqual(interpreterWrong.getDB(), null);
    })
});

describe("ExtractFacts",function(){
    it('should return only the facts as an array',function(){
        var arrayFacts = ["varon(juan)","varon(pepe)","padre(juan,pepe)","madre(ana,juan)"];
        assert.deepEqual(interpreter.extractFacts(), arrayFacts);
    })
});

describe("ExtractRules",function(){
    it('should return only the rules as an array',function(){
        var arrayRules = ["padres(X,Y,Z):-padre(X,Z),madre(Y,Z)"];
        assert.deepEqual(interpreter.extractRules(), arrayRules);
    })
});
