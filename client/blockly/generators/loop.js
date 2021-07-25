import Blockly from "blockly";

Blockly.JavaScript["repeat"] = function (block) {
  let n_times = block.getFieldValue("n_times");
//   let code_in = block.getFieldValue("repeat_code");
  var statements_repeat_code = Blockly.JavaScript.statementToCode(block, 'repeat_code');
  return `for(var i=0; i<` + n_times + `;i++){` + statements_repeat_code + `}`;
};
