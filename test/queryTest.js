var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');

beforeEach(function () {
    interpreter = new Interpreter();
    interpreter.parseDB(interpreter.loadDB(true));
});

describe("ValidateQuery",function(){
    it('should return true ',function(){
        assert.equal(interpreter.validateQuery("padre(juan,manuel)."), true);
    })
});

describe("ValidateWrongQuery01",function(){
    it('should return false ',function(){
        assert.equal(interpreter.validateQuery("padre(juan,manuel."), false);
    })
});

/*
describe("ValidateWrongQuery02",function(){
    it('should return false ',function(){
        assert.equal(interpreter.validateQuery("padre(juan manuel)"), false);
    })
});
*/
