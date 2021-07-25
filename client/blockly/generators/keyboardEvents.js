import Blockly from 'blockly';

Blockly.JavaScript['up_arrow'] = function (block) {
  let text =
    String(Blockly.JavaScript.statementToCode(block, 'DO')).trim() || 'hello';
  console.log(text);
  console.log(text == 'moveForward();');
  let args;
  switch (true) {
    case text.includes('moveForward();'):
      args = "'mf'";
      break;
    case text.includes('moveBackward();'):
      args = "'mb'";
      break;
    case text.includes('turnLeft();'):
      args = "'tl'";
      break;
    case text.includes('turnRight();'):
      args = "'tr'";
      break;
    default:
      args = "'default'";
      break;
  }
  console.log(args);
  // console.log(`yaaaaaaaar: this.${text}`);
  // console.log(typeof text);
  // let arg = "var fn = function() { }";
  return 'attachUpKeyEvent(' + args + ', 38);';
};

Blockly.JavaScript['left_arrow'] = function (block) {
  let text =
    String(Blockly.JavaScript.statementToCode(block, 'DO')).trim() || 'hello';
  console.log(text);
  console.log(text == 'moveForward();');
  let args;
  switch (true) {
    case text.includes('moveForward();'):
      args = "'mf'";
      break;
    case text.includes('moveBackward();'):
      args = "'mb'";
      break;
    case text.includes('turnLeft();'):
      args = "'tl'";
      break;
    case text.includes('turnRight();'):
      args = "'tr'";
      break;
    default:
      args = "'default'";
      break;
  }
  console.log(args);
  // console.log(`yaaaaaaaar: this.${text}`);
  // console.log(typeof text);
  // let arg = "var fn = function() { }";
  return 'attachLeftKeyEvent(' + args + ', 37 );';
};

Blockly.JavaScript['right_arrow'] = function (block) {
  let text =
    String(Blockly.JavaScript.statementToCode(block, 'DO')).trim() || 'hello';
  console.log(text);
  console.log(text == 'moveForward();');
  let args;
  switch (true) {
    case text.includes('moveForward();'):
      args = "'mf'";
      break;
    case text.includes('moveBackward();'):
      args = "'mb'";
      break;
    case text.includes('turnLeft();'):
      args = "'tl'";
      break;
    case text.includes('turnRight();'):
      args = "'tr'";
      break;
    default:
      args = "'default'";
      break;
  }
  console.log(args);
  // console.log(`yaaaaaaaar: this.${text}`);
  // console.log(typeof text);
  // let arg = "var fn = function() { }";
  return 'attachRightKeyEvent(' + args + ', 39);';
};

// Blockly.JavaScript["right_arrow"] = function(block) {
//     let text = Blockly.JavaScript.statementToCode(block, "DO") || "'hello'";
//     return `addRightArrowEventListener();\n`;
// };

// Blockly.JavaScript["left_arrow"] = function(block) {
//     let text = Blockly.JavaScript.statementToCode(block, "DO") || "'hello'";
//     return `addLeftArrowEventListener();\n`;
// };

// Blockly.JavaScript["up_arrow"] = function(block) {
//     let text = Blockly.JavaScript.statementToCode(block, "DO") || "'hello'";
//     return `addEventListener("keydown", function(event){if(event.keyCode==38)${text}});\n`;
// };

// Blockly.JavaScript["up_arrow"] = function(block) {
//     let text = Blockly.JavaScript.statementToCode(block, "DO") || "'hello'";
//     return `if( 'true' == attachUpKeyEvent()){
//         ${text}
//     }
//     ;`;
// };
