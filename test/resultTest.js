var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');

beforeEach(function () {
    interpreter = new Interpreter();
    interpreter.parseDB(interpreter.loadDB(true));

});

describe("evaluaeteWrongQuery",function(){
    it('should return null ',function(){
        assert.equal(interpreter.evaluateQuery("padrejuan,manuel"), null);
    })
});
