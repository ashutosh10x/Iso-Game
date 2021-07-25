import * as Blockly from "blockly/core";

import * as motion from "./motion";
import * as keyboardEvents from "./keyboardEvents";
import * as loop from "./loop";

// Since we're using json to initialize the field, we'll need to import it.
// import "../fields/BlocklyReactField";
// import "../fields/DateField";

// var testReactField = {
//     type: "custom_print",
//     message0: "print %1",
//     args0: [
//         {
//             type: "input_value",
//             name: "TEXT",
//             check: "String"
//         }
//     ],
//     inputsInline: true,
//     previousStatement: null,
//     nextStatement: null,
//     colour: 230,
//     tooltip: "This will print hello",
//     helpUrl: "www.google.com"
// };

// Blockly.Blocks["custom_print"] = {
//     init: function() {
//         this.jsonInit(testReactField);
//         this.setStyle("loop_blocks");
//     }
// };

var play = {
    type: "play",
    message0: "when play",
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 345,
    tooltip: "When you hit play the attached blocks execute",
    helpUrl: "www.google.com"
};

Blockly.Blocks["play"] = {
    init: function() {
        this.jsonInit(play);
        this.setStyle("loop_blocks");
    }
};
