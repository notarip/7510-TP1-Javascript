var assert = require("assert");

var fs = require('fs');
var vm = require('vm');
var path = "src/app.js";
var code = fs.readFileSync(path);
vm.runInThisContext(code);


describe("evaluaeteWrongQuery",function(){
    it('should return null ',function(){
        assert.equal(evaluateQuery(loadDB(true), "padrejuan,manuel"), null);
    })
});
