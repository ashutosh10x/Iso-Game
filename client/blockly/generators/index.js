import Blockly from "blockly";
// import "blockly/javascript";
import * as motions from "./motions";
import * as keyboardEvents from "./keyboardEvents";
import * as loop from "./loop";


// Blockly.JavaScript["custom_print"] = function(block) {
//     // let text = block.getFieldValue("text");
//     let text =
//         Blockly.JavaScript.valueToCode(
//             block,
//             "TEXT",
//             Blockly.JavaScript.ORDER_NONE
//         ) || "'hello'";
//     return `alert(${text});\n`;
// };

Blockly.JavaScript["repeat_until_destination"] = function(block) {
    // let text = block.getFieldValue("text");
    let text =
        Blockly.JavaScript.statementToCode(block, "DO") ||
        "'alert(\\'some error occured\\')'";
    return `while( 'true' == repeatUntilDestination()){
        ${text}
    }
    ;`;
};