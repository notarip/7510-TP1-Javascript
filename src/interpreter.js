
var Interpreter = function () {

  var self = this;
  this.db = "";

  this.replaceAll = function(str, search, replacement) {
     return str.split(search).join(replacement);
  };

  this.getDB = function(){
    return this.db;
  }

  this.parseDB = function(db) {
    var parsedDB = [];
    if(Object.prototype.toString.call(db) === '[object Array]'){
      parsedDB = this.cleanDot(db);
    }else{
      parsedDB = db.split(".");
    }

    parsedDB = this.cleanWhities(parsedDB);
    parsedDB = this.cleanRC(parsedDB);
    var checkFact = this.checkFact;
    var checkRule = this.checkRule;

    var trulyArr = parsedDB.map(function (elem) {
      return (checkFact(elem) || checkRule(elem));
    });

    var dbState = trulyArr.reduce(function (e1, e2) {
      return e1 && e2;
    });

    if (dbState) {
      this.db = parsedDB;
    } else {
      this.db = null;
    }

    return this.db;
  }

  this.loadDB = function(nice) {
    var wrongDB = "varon(juan).\nvaron";
    var niceDB = "varon(juan).\nvaron(pepe).\npadre(juan,pepe).\nmadre(ana,juan).\npadres(X,Y,Z):-padre(X,Z),madre(Y,Z).";

    if (nice) {
      return niceDB;
    } else {
      return wrongDB;
    }
  }

  this.checkFact = function(fact) {
    var re = /\w+\([a-z,]*\)(?!:)/;
    return re.test(fact);
  }

  this.checkRule = function(rule) {
    var re = /\w+\([A-Z,]*\):-(\w+\([A-Z,]*\),?)+/;
    return re.test(rule);
  }

  this.cleanRC = function(arr) {
    arr = arr.filter(function (elem) {
      return elem.trim() != '';
    });
    return arr;
  }

  this.cleanWhities = function(arr) {
    arr = arr.map(function (elem) {
      elem =  self.replaceAll(elem,'\n', '')
      return self.replaceAll(elem, ' ','');
    });
    return arr;
  }

  this.cleanDot = function(arr) {
    return arr.map(function (elem) {
      return elem.replace('.', '');
    });
  }
  
  this.cleanQuery = function(query) {
    query = self.replaceAll(query,".", "");
    return self.replaceAll(query," ","");
  }

  this.validateQuery = function(query) {
    query = self.cleanQuery(query);
    return (self.checkFact(query) || self.checkRule(query));
  }

  this.extractFacts = function() {
    var arr = self.getDB();
    var checkFact = self.checkFact;
    var facts = arr.filter(function (elem) {
      return checkFact(elem);
    });
    return facts;
  }

  this.extractRules = function() {
    var arr = self.getDB();
    var checkRule = self.checkRule;
    var rules = arr.filter(function (elem) {
      return checkRule(elem);
    });
    return rules;
  }

  this.extractRuleName = function(rule) {
    var re = /(\w+)(\(.*\):-)/;
    var match = re.exec(rule);

    return match[1];
  }

  this.extractRuleParams = function(rule) {
    var re = /(\w+)\((.*)\):-/;
    var match = re.exec(rule);
    var params = match[2].split(",");

    return params;
  }

  this.extractRuleFacts = function(rule) {
    var re = /(\w+)\((.*)\):-(.*)/;
    var match = re.exec(rule);
    var factsAsString = match[3];
    var re2 = /\w+\([A-Z,]+\)/g;
    var facts = [];
    while ((arr = re2.exec(factsAsString)) !== null) {
      facts.push(arr[0]);
    }

    return facts;
  }

  this.transformRule = function(rule) {
    var ruleName = self.extractRuleName(rule);
    var ruleParams = self.extractRuleParams(rule);
    var ruleFacts = self.extractRuleFacts(rule);

    ruleParams.forEach(function (item, index) {
      ruleFacts = ruleFacts.map(function (elem) {
        return elem.replace(item, index);
      });
    });

    var transformedRule = { "name": ruleName, "facts": ruleFacts };

    return transformedRule;
  }

  this.transformRules = function(arr) {
    var transformRule = this.transformRule;
    rules = arr.map(function (elem) {
      return transformRule(elem);
    });

    return rules;
  }

  this.evaluateFact = function(query, facts) {
    fact = [];
    fact = facts.filter(function (elem) {
      return elem == query;
    });

    return (fact.length > 0);
  }

  this.extracQueryParams = function(query){

    matches = query.match(/[a-z]+/g);
    return matches.splice(1,matches.length);     
  }

  this.evaluateRule = function(query, rules, facts) {
    var re = /(\w+)\([a-z,]+\)/;
    var ruleName = re.exec(query)[1];
    rule = rules.filter(function (elem) {
      return elem.name == ruleName;
    });

    if (rule.length == 1) {
      rule = rule[0];
      params =self.extracQueryParams(query);
      toEvaluateFacts = rule.facts;
      params.forEach(function (item, index) {
        toEvaluateFacts = toEvaluateFacts.map(function (elem) {
          return elem.replace(index, item);
        });
      });
      evaluatedFacts = toEvaluateFacts.map(function(elem){
        return self.evaluateFact(elem,facts);
      });
      return evaluatedFacts.reduce(function(e1,e2){
        return e1 && e2;
      });
    } else {
      return false;
    }
  }

  this.evaluateQuery = function(query) {

    if (self.validateQuery(query)) {
      query = self.cleanQuery(query);
      db = self.getDB();
      facts = self.extractFacts(db);
      rules = self.transformRules(this.extractRules(db));
      return self.evaluateFact(query, facts) || self.evaluateRule(query, rules, facts);
    } else {
      return null;
    }
  }
  this.checkQuery = this.evaluateQuery; 
}

module.exports = Interpreter;