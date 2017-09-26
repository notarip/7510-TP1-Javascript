var assert = require("assert");

var fs = require('fs');
var vm = require('vm');
var path = "src/app.js";
var code = fs.readFileSync(path);
vm.runInThisContext(code);


describe("ValidateQuery",function(){
    it('should return true ',function(){
        assert.equal(validateQuery("padre(juan,manuel)."), true);
    })
});

describe("ValidateWrongQuery01",function(){
    it('should return false ',function(){
        assert.equal(validateQuery("padre(juan,manuel."), false);
    })
});

describe("ValidateWrongQuery02",function(){
    it('should return false ',function(){
        assert.equal(validateQuery("padre(juan manuel)"), false);
    })
});
