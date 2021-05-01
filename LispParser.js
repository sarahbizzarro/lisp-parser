let input = "(first (list 1 (+ 2 3) 9))";

let tokenized = tokenize(input);
// console.log(tokenized);

let parsed = parse(tokenized);
//console.log(parsed);

//print([parsed]);

let interpreted = interpret([parsed]);

console.log(interpreted);

function tokenize(str) {
  let x = "";
  let tokenized = [];

  const arr = [...str];

  arr.forEach(elem => {
    if (elem == '(' || elem == ')' || elem == ' ') {
      if (x != "") {
        tokenized.push(x);
        x = "";
      }
      if (elem == '(' || elem == ')') {
        tokenized.push(elem);
      }
    } else {
      x += elem;
    }
  });
  return tokenized;
}

function parse(tokenized) {
  let currArr = [];
  let lists = [];

  tokenized.forEach(token => {
    if (token == "(") {
      let newArr = [];
      lists.push(newArr);
      currArr = newArr
    } else if (token == ")") {
      let temp = currArr;
      lists.pop();
      if (lists.length == 0) {
        return currArr;
      }
      currArr = lists[lists.length - 1];
      currArr.push(temp);
    } else {
      currArr.push(token);
    }
  });
  return currArr;
}

function print(list) {
  list.forEach(item => {
    if (item instanceof Array) {
      console.log(item);
      print(item);
    }
  });
}

function interpret(parsed) {
  parsed.forEach((expr, i) => {
    if (expr instanceof Array) {
      interpret(expr);
      const v = compute(expr);
      parsed[i] = v;
    }
  });
  return parsed;
}


function compute(arr) {
  switch (arr[0]) {
    case "+":
      return parseFloat(arr[1]) + parseFloat(arr[2]);
    case "list":
      return arr.slice(arr[1]);
    case "first":
      let v = arr[1]
      return v[0];
  }
}

