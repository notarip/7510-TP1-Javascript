var assert = require("assert");

var fs = require('fs');
var vm = require('vm');
var path = "src/app.js";
var code = fs.readFileSync(path);
vm.runInThisContext(code);


describe("LoadNiceDB",function(){
    it('should return de nice db',function(){
        var niceDB = "varon(juan).\nvaron(pepe).\npadre(juan,pepe).\nmadre(ana,juan).\npadres(X,Y,Z):-padre(X,Z),madre(Y,Z).";
        assert.equal(loadDB(true), niceDB);
    })
});


describe("LoadWrongDB",function(){
    it('should return de wrong db',function(){
        var wrongDB = "varon(juan).\nvaron";
        assert.equal(loadDB(false), wrongDB);
    })
});