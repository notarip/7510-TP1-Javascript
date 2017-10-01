var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');

beforeEach(function () {
    interpreter = new Interpreter();
    interpreter.parseDB(interpreter.loadDB(true));
});

describe("LoadNiceDB",function(){
    it('should return de nice db',function(){
        var niceDB = "varon(juan).\nvaron(pepe).\npadre(juan,pepe).\nmadre(ana,juan).\npadres(X,Y,Z):-padre(X,Z),madre(Y,Z).";
        assert.equal(interpreter.loadDB(true), niceDB);
    })
});


describe("LoadWrongDB",function(){
    it('should return de wrong db',function(){
        var wrongDB = "varon(juan).\nvaron";
        assert.equal(interpreter.loadDB(false), wrongDB);
    })
});
