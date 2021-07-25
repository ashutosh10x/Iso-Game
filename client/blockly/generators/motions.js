import Blockly from 'blockly';

Blockly.JavaScript['move_forward'] = function (block) {
  // let text = block.getFieldValue("text");
  return `moveForward();\n`;
};

Blockly.JavaScript['move_backward'] = function (block) {
  // let text = block.getFieldValue("text");
  return `moveBackward();\n`;
};

Blockly.JavaScript['turn_left'] = function (block) {
  // let text = block.getFieldValue("text");
  return `turnLeft();\n`;
};

Blockly.JavaScript['turn_right'] = function (block) {
  // let text = block.getFieldValue("text");
  return `turnRight();\n`;
};
