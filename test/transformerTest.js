var assert = require("assert");

var fs = require('fs');
var vm = require('vm');
var path = "src/app.js";
var code = fs.readFileSync(path);
vm.runInThisContext(code);


describe("TransformeRule",function(){
    it('should return a rule transformed ',function(){
        var rule = "padres(X,Y,Z):-padre(X,Z),madre(Y,Z))";
        var transformedRule = { name: 'padres', facts: [ 'padre(0,2)', 'madre(1,2)' ] };
        assert.deepEqual(transformRule(rule), transformedRule);
    })
});
