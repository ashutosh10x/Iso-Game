import * as Blockly from "blockly/core";

// Since we're using json to initialize the field, we'll need to import it.
// import "../fields/BlocklyReactField";
// import "../fields/DateField";

var repeatBlock = {
  type: "repeat",
  message0: "repeat %1 %2 %3",
  args0: [
    {
      type: "field_number",
      name: "n_times",
      value: 5,
      min: 0,
      precision: 1,
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "repeat_code",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 270,
  tooltip: "Repeat",
  helpUrl: "",
};

Blockly.Blocks["repeat"] = {
  init: function () {
    this.jsonInit(repeatBlock);
    this.setStyle("loop_blocks");
  },
};
