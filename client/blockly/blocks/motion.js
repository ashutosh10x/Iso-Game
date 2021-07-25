import * as Blockly from 'blockly/core';

// Since we're using json to initialize the field, we'll need to import it.
// import "../fields/BlocklyReactField";
// import "../fields/DateField";

var moveForwardBlock = {
  type: 'move_forward',
  message0: 'Move Forward',
  inputsInline: false,
  previousStatement: null,
  nextStatement: null,
  colour: 345,
  tooltip: 'Enter how much you want to move your character',
  helpUrl: 'www.google.com',
};

Blockly.Blocks['move_forward'] = {
  init: function () {
    this.jsonInit(moveForwardBlock);
    this.setStyle('loop_blocks');
  },
};

var moveBackwardBlock = {
  type: 'move_backward',
  message0: 'Move Backward',
  inputsInline: false,
  previousStatement: null,
  nextStatement: null,
  colour: 345,
  tooltip: 'Enter how much you want to move your character',
  helpUrl: 'www.google.com',
};

Blockly.Blocks['move_backward'] = {
  init: function () {
    this.jsonInit(moveBackwardBlock);
    this.setStyle('loop_blocks');
  },
};

var turnLeftBlock = {
  type: 'turn_left',
  message0: 'Turn Left',
  inputsInline: false,
  previousStatement: null,
  nextStatement: null,
  colour: 345,
  tooltip: 'Enter how much you want to move your character',
  helpUrl: 'www.google.com',
};

Blockly.Blocks['turn_left'] = {
  init: function () {
    this.jsonInit(turnLeftBlock);
    this.setStyle('loop_blocks');
  },
};

var turnRightBlock = {
  type: 'turn_right',
  message0: 'Turn Right',
  inputsInline: false,
  previousStatement: null,
  nextStatement: null,
  colour: 345,
  tooltip: 'Enter how much you want to move your character',
  helpUrl: 'www.google.com',
};

Blockly.Blocks['turn_right'] = {
  init: function () {
    this.jsonInit(turnRightBlock);
    this.setStyle('loop_blocks');
  },
};

var repeatUntilDestinationBlock = {
  type: 'repeat_until_destination',
  message0: 'repeat until destination',
  message1: 'do %1',
  args1: [
    {
      type: 'input_statement',
      name: 'DO',
    },
  ],
  inputsInline: true,
  previousStatement: null,
  colour: 345,
  tooltip:
    'Keeps executing the statements within body until you have reached the destination',
  helpUrl: 'www.google.com',
};

Blockly.Blocks['repeat_until_destination'] = {
  init: function () {
    this.jsonInit(repeatUntilDestinationBlock);
    this.setStyle('loop_blocks');
  },
};
