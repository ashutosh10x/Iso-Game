import Interpreter from 'js-interpreter';

function alertInterpreter(interpreter, scope) {
  const alertWrapper = function (text) {
    return alert(arguments.length ? text : '');
  };

  interpreter.setProperty(
    scope,
    'alert',
    interpreter.createNativeFunction(alertWrapper)
  );
}

function promptInterpreter(interpreter, scope) {
  // Add an API function for the prompt() block.
  const promptWrapper = function (text) {
    return prompt(text);
  };
  interpreter.setProperty(
    scope,
    'prompt',
    interpreter.createNativeFunction(promptWrapper)
  );
}

function consoleInterpreter(interpreter, scope) {
  const consoleWrapper = function (text) {
    return console.log(text);
  };
  interpreter.setProperty(
    scope,
    'console',
    interpreter.createNativeFunction(consoleWrapper)
  );
}

function moveForwardInterpreter(interpreter, scope, func) {
  const moveForwardWrapper = () => {
    return func();
  };
  interpreter.setProperty(
    scope,
    'moveForward',
    interpreter.createNativeFunction(moveForwardWrapper)
  );
}

function moveBackwardInterpreter(interpreter, scope, func) {
  const moveBackwardWrapper = () => {
    return func();
  };
  interpreter.setProperty(
    scope,
    'moveBackward',
    interpreter.createNativeFunction(moveBackwardWrapper)
  );
}

function turnLeftInterpreter(interpreter, scope, func) {
  const turnLeftWrapper = () => {
    return func();
  };
  interpreter.setProperty(
    scope,
    'turnLeft',
    interpreter.createNativeFunction(turnLeftWrapper)
  );
}

function turnRightInterpreter(interpreter, scope, func) {
  const turnRightWrapper = () => {
    return func();
  };
  interpreter.setProperty(
    scope,
    'turnRight',
    interpreter.createNativeFunction(turnRightWrapper)
  );
}

function highlightBlockInterpreter(interpreter, scope, workspace) {
  const highlightBlockWrapper = (id) => {
    workspace && workspace.highlightBlock(id);
  };
  interpreter.setProperty(
    scope,
    'highlightBlock',
    interpreter.createNativeFunction(highlightBlockWrapper)
  );
}

function initApi(interpreter, scope, funcList, workspace) {
  moveForwardInterpreter(interpreter, scope, funcList[0]);
  turnLeftInterpreter(interpreter, scope, funcList[1]);
  turnRightInterpreter(interpreter, scope, funcList[2]);
  moveBackwardInterpreter(interpreter, scope, funcList[3]);
  alertInterpreter(interpreter, scope);
  consoleInterpreter(interpreter, scope);
  promptInterpreter(interpreter, scope);
  highlightBlockInterpreter(interpreter, scope, workspace);
}

export default initApi;
