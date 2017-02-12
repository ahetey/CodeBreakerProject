let answer  = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let message = document.getElementById('message');
let results = document.getElementById('results');
let code    = document.getElementById('code');
let attempts = 0;

function guess() {
    let input = document.getElementById('user-guess');
    console.log('function guess');
    console.log('attempts', attempts);
    if ((attempt.value == '') || (answer.value) == '') {
          setHiddenFields();
    }
    if (validateInput(input.value)) {
      attempts = attempts + 1;
      attempt.value = attempts;
    }
    else {
      return false;
    }
    if (getResults(input.value)) {
      setMessage("You Win! :)");
      showAnswer(1);
      showReplay();
    }
    else if (attempt.value >= 10) {
      setMessage("You Lose! :(");
      showAnswer(0);
      showReplay();
    }
    else {
      setMessage("Incorrect, try again.");
    }
}

function showReplay() {
  document.getElementById('guessing-div').style.display = 'none';
  document.getElementById('replay-div').style.display = 'block';
}

function showAnswer(win) {
  code.innerHTML = answer.value;
  code.className = (win)? 'code success' : 'code failure';
}

function getResults(input) {
  var old_result = results.innerHTML;
  var answ = answer.value;
  var correct = 0;
  var neu = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
  for (var i=0; i<input.length; i++) {
    var pos = '';
    if (input[i] == answ[i]) {
      pos = '+';
      neu += '<span class="glyphicon glyphicon-ok"></span>';
      correct++;
    }
    else if (answ.includes(input[i])) {
      pos = 'o';
      neu += '<span class="glyphicon glyphicon-transfer"></span>';
    }
    else {
      pos = '-';
      neu += '<span class="glyphicon glyphicon-remove"></span>';
    }
    // console.log("i.",i, input[i], pos);
  }
  results.innerHTML = old_result + neu + '</div></div>\n';
  // console.log('results', results.innerHTML);
  return (correct == 4) ? true : false;
}

function setHiddenFields() {
  console.log('function setHiddenFields');
  var rand = Math.random() * 10000;
  var answ = Math.floor(rand).toString();
  while (answ.length < 4) {
    answ = '0' + answ;
  }
  console.log('answer', answ);
  attempt.value = 0;
  answer.value = answ;
}

function setMessage(msg) {
  message.innerHTML = msg;
  // alert(msg);
  console.log("msg:", message.innerHTML);
}

function validateInput(inp) {
  if (inp.length == 4) {
    return true;
  } else {
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
  }
}
