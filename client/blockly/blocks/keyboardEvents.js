import * as Blockly from "blockly/core";

var rightArrowPressed = {
    type: "right_arrow",
    message0: "when -> pressed",
    message1: "do %1",
    args1: [
        {
            type: "input_statement",
            name: "DO"
        }
    ],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 345,
    tooltip: "When you hit -> on your keyboard the character turns right",
    helpUrl: "www.google.com"
};

Blockly.Blocks["right_arrow"] = {
    init: function() {
        this.jsonInit(rightArrowPressed);
        this.setStyle("loop_blocks");
    }
};

var leftArrowPressed = {
    type: "left_arrow",
    message0: "when <- pressed",
    message1: "do %1",
    args1: [
        {
            type: "input_statement",
            name: "DO"
        }
    ],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 345,
    tooltip: "When you hit <- on your keyboard the character turns left",
    helpUrl: "www.google.com"
};

Blockly.Blocks["left_arrow"] = {
    init: function() {
        this.jsonInit(leftArrowPressed);
        this.setStyle("loop_blocks");
    }
};

var upArrowPressed = {
    type: "up_arrow",
    message0: "when up arrow pressed",
    message1: "do %1",
    args1: [
        {
            type: "input_statement",
            name: "DO"
        }
    ],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 345,
    tooltip:
        "When you hit up arrow on your keyboard the character moves forward",
    helpUrl: "www.google.com"
};

Blockly.Blocks["up_arrow"] = {
    init: function() {
        this.jsonInit(upArrowPressed);
        this.setStyle("loop_blocks");
    }
};
