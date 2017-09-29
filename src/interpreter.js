



var Interpreter = function () {

  this.db = "";

  this.getDB = function(){
    return this.db;
  }

  this.parseDB = function(db) {
    var parsedDB = db.split(".");
    parsedDB = this.cleanWhities(parsedDB);
    parsedDB = this.cleanRC(parsedDB);
    var checkFact = this.checkFact;
    var checkRule = this.checkRule;

    trulyArr = parsedDB.map(function (elem) {
      return (checkFact(elem) || checkRule(elem));
    });

    dbState = trulyArr.reduce(function (e1, e2) {
      return e1 && e2;
    });

    if (dbState) {
      this.db = parsedDB;
    } else {
      this.db = null;
    }

    return this.db;
  }


  this.checkQuery = function (params) {
    return true;
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
      return elem.replace('\n', '');
    });
    return arr;
  }

  
  this.cleanQuery = function(query) {
    return query.replace(".", "").trim();
  }

  this.validateQuery = function(query) {
    query = this.cleanQuery(query);
    return (this.checkFact(query) || this.checkRule(query));
  }

  this.extractFacts = function() {
    var arr = this.getDB();
    var checkFact = this.checkFact;
    var facts = arr.filter(function (elem) {
      return checkFact(elem);
    });
    return facts;
  }

  this.extractRules = function() {
    var arr = this.getDB();
    var checkRule = this.checkRule;
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
    var ruleName = extractRuleName(rule);
    var ruleParams = extractRuleParams(rule);
    var ruleFacts = extractRuleFacts(rule);

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

  this.evaluateRule = function(query, rules, facts) {
    var re = /(\w+)\([a-z,]+\)/;
    var ruleName = re.exec(query)[1];
    rule = rules.filter(function (elem) {
      return elem.name == ruleName;
    });

    if (rule.length == 1) {
      rule = rule[0];
      params = extracQueryParams(query);
      toEvaluateFacts = rule.facts;
      params.forEach(function (item, index) {
        toEvaluateFacts = toEvaluateFacts.map(function (elem) {
          return elem.replace(index, item);
        });
      });
    } else {
      return false;
    }
  }

  this.evaluateQuery = function(db, query) {

    if (validateQuery(query)) {
      query = cleanQuery(query);
      db = parseDB(db);
      facts = extractFacts(db);
      rules = transformRules(extractRules(db));
      return evaluateFact(query, facts) || evaluateRule(query, rules, facts);
    } else {
      return null;
    }
  }
}

module.exports = Interpreter;

/*interpreter = new Interpreter();

console.log(interpreter.parseDB(loadDB(false)));
*/