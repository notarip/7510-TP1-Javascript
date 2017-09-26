

function loadDB(nice)
{
 var wrongDB = "varon(juan).\nvaron";
 var niceDB = "varon(juan).\nvaron(pepe).\npadre(juan,pepe).\nmadre(ana,juan).\npadres(X,Y,Z):-padre(X,Z),madre(Y,Z).";

    if (nice){
        return niceDB;
    }else{
        return wrongDB;
    }
}

function checkFact(fact)
{
    var re = /\w+\([a-z,]*\)(?!:)/;
    return re.test(fact);
}

function checkRule(rule)
{
    var re = /\w+\([A-Z,]*\):-(\w+\([A-Z,]*\),?)+/;
    return re.test(rule);
}


function cleanRC(arr)
{
  arr = arr.filter(function(elem){
      return elem.trim() != '';
  });
  return arr;
}

function cleanWhities(arr)
{
  arr = arr.map(function(elem){
    return elem.replace('\n','');
  });
  return arr;
}

function parseDB($db)
{
  var parsedDB = $db.split(".");
  parsedDB = cleanWhities(parsedDB);
  parsedDB = cleanRC(parsedDB);

  trulyArr = parsedDB.map(function(elem){
    return (checkFact(elem) || checkRule(elem));
  });

  dbState = trulyArr.reduce(function (e1,e2){
    return e1 && e2;
  });

  if(dbState){
    return parsedDB;
  }else{
    return null;
  }
}

function cleanQuery(query)
{
  return query.replace(".","").trim();
}

function validateQuery(query)
{
  query = cleanQuery(query);
  return (checkFact(query) || checkRule(query));
}

function extractFacts(arr)
{
  var facts = arr.filter(function(elem){
    return checkFact(elem);
  });
  return facts;
}

function extractRules(arr)
{
  var rules = arr.filter(function(elem){
    return checkRule(elem);
  });
  return rules;
}

function extractRuleName(rule)
{
  var re = /(\w+)(\(.*\):-)/;
  var match = re.exec(rule);

  return match[1];
}

function extractRuleParams(rule)
{
  var re = /(\w+)\((.*)\):-/;
  var match = re.exec(rule);
  var params = match[2].split(",");

  return params;
}

function extractRuleFacts(rule)
{
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

function transformRule(rule)
{
  var ruleName = extractRuleName(rule);
  var ruleParams = extractRuleParams(rule);
  var ruleFacts = extractRuleFacts(rule);

   ruleParams.forEach(function(item,index){
    ruleFacts = ruleFacts.map(function(elem){
      return elem.replace(item,index);
    });
  });

  var transformedRule = {"name": ruleName, "facts" : ruleFacts};

  return transformedRule;
}

function transformRules(arr)
{
  rules = arr.map(function(elem){
    return transformRule(elem);
  });

  return rules;
}

function evaluateFact(query, facts)
{
  fact = [];
  fact = facts.filter(function(elem){
    return elem == query;
  });

  return (fact.length > 0);
}

function evaluateRule(query, rules, facts)
{
  var re = /(\w+)\([a-z,]+\)/;
  var ruleName = re.exec(query)[1];
  rule = rules.filter(function(elem){
    return elem.name == ruleName;
  });
  if(rule.length == 1){
      rule = rule[0];
      params = extracQueryParams(query);
      toEvaluateFacts = rule.facts;
      params.forEach(function(item,index){
       toEvaluateFacts = toEvaluateFacts.map(function(elem){
         return elem.replace(index,item);
       });

  }else{
    return false;
  }



}

function evaluateQuery(db, query){

  if(validateQuery(query)){
    query = cleanQuery(query);
    db = parseDB(db);
    facts = extractFacts(db);
    rules = transformRules(extractRules(db));
    return evaluateFact(query, facts) || evaluateRule(query, rules, facts);
  }else{
    return null;
  }
}


/*
* - funcion que separe las rules de los facts
* - funcion que valide una rule
* - funcion que valide un fact
* - funcion que parsee una rule
* - funcion que separe toda la db
* - funcion que reemplace las ocurrencias de un array de strigs
* -
* */

console.log(evaluateQuery(loadDB(true),'padres(juan,ana,pepe)'));
