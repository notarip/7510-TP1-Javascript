var assert = require("assert");

var fs = require('fs');
var vm = require('vm');
var path = "src/app.js";
var code = fs.readFileSync(path);
vm.runInThisContext(code);


describe("ParseNiceDB",function(){
    it('should return the db as array',function(){
        var arrayNiceDB = ["varon(juan)","varon(pepe)","padre(juan,pepe)","madre(ana,juan)","padres(X,Y,Z):-padre(X,Z),madre(Y,Z)"];
        assert.deepEqual(parseDB(loadDB(true)), arrayNiceDB);
    })
});

describe("ParseWrongDB",function(){
    it('should return null',function(){
        assert.deepEqual(parseDB(loadDB(false)), null);
    })
});

describe("ExtractFacts",function(){
    it('should return only the facts as an array',function(){
        var arrayFacts = ["varon(juan)","varon(pepe)","padre(juan,pepe)","madre(ana,juan)"];
        assert.deepEqual(extractFacts(parseDB(loadDB(true))), arrayFacts);
    })
});

describe("ExtractRules",function(){
    it('should return only the rules as an array',function(){
        var arrayRules = ["padres(X,Y,Z):-padre(X,Z),madre(Y,Z)"];
        assert.deepEqual(extractRules(parseDB(loadDB(true))), arrayRules);
    })
});
