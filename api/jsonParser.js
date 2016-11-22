export default function resultParser(json) {
  let file = json.quizReport;
  let answer = {};
  answer.username = userName(file);
  return answer;
}

function userName(file) {
  const variables = file.summary.variables;
  let userName = null;
  if (isArray(variables)) {
    variables.forEach( variable => {
      if (variable.name === "USER_NAME")
        userName = variable.value;
    });
  }
  else {
    userName = variables.variable.value;
  }
  return userName;
}

function isArray(variables){
  if (Array.isArray(variables)) return true;
  return false;
}
