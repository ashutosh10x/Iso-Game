import React, { useRef, Fragment, useEffect, useState } from "react";

// var Blockly = require("../../../server/helper/blockly/blockly_compressed.js");
// var Blockly2 = require("../../../server/helper/blockly/blocks_compressed.js");
// var Blockly3 = require("../../../server/helper/blockly/msg/js/en.js");
import Blockly from "blockly";
import Interpreter from "js-interpreter";
import Styles from "./styles";
import { Modal } from "shards-react";
import axiosInstance from "../../config/axios";
// import { Block } from "blockly/blockly-node";
// import { browserHistory } from "react-router";

const toolboxXml = `
<xml id="toolbox" style="display: none">
<category name="Functions" colour="290" expanded="true">
  <block type="controls_if"></block>
  <block type="controls_repeat_ext"></block>
  </category>
  <category name="Loops" colour="290" categorystyle="logic_category">
  <block type="logic_compare"></block>
  <block type="math_number"></block>
  <block type="math_arithmetic"></block>
  </category>
    <category name="Functions" custom="PROCEDURE"></category>
  <category name="Colours" custom="COLOUR_PALETTE"></category>

</xml>
`;

const gridSetting = { spacing: 20, length: 3, colour: "#ccc", snap: true };
const zoom = {
    controls: true,
    wheel: false,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2
};

const blockStyles = {
    list_blocks: {
        colourPrimary: "#4a148c",
        colourSecondary: "#AD7BE9",
        colourTertiary: "#CDB6E9"
    },
    logic_blocks: {
        colourPrimary: "#01579b",
        colourSecondary: "#64C7FF",
        colourTertiary: "#C5EAFF"
    }
};

const categoryStyles = {
    list_category: {
        colours: "#4a148c"
    },
    logic_category: {
        colour: "#01579b"
    }
};

const theme = Blockly.Theme("blockly", blockStyles, categoryStyles);

const move = {
    scrollbars: true,
    drag: true,
    wheel: true
};

function BlocklyDemo(props) {
    // let workspace;
    const [code, setCode] = useState(undefined);
    const [workspace, setWorkspace] = useState(undefined);
    const [success, updateSuccess] = useState(false);
    const [blockList, updateBlockList] = useState(undefined);
    const [toolbox, updateToolbox] = useState(toolboxXml);
    const [workspaceCode, updateWorkspaceCode] = useState(undefined);
    const [deployed, updateDeployed] = useState(false);

    useEffect(() => {
        setWorkspace(
            Blockly.inject("blocklyDiv", {
                toolbox: props.toolbox || toolboxXml,
                grid: gridSetting,
                zoom: zoom,
                theme: theme,
                move: move,
                trashcan: true
            })
        );

        // workspace.setTheme(theme)
    }, []);

    useEffect(() => {
        return workspace && workspace.removeChangeListener(updateCode);
    }, []);

    useEffect(() => {
        workspace &&
            workspace.registerToolboxCategoryCallback(
                "COLOUR_PALETTE",
                coloursFlyoutCallback
            );
    }, [workspace]);

    function coloursFlyoutCallback() {
        const colourList = ["#4286f4", "#ef0447"];
        const xmlList = [];
        if (Blockly.Blocks["colour_picker"]) {
            for (let i = 0; i < colourList.length; i++) {
                const blockText =
                    '<block type="colour_picker">' +
                    '<field name="COLOUR">' +
                    colourList[i] +
                    "</field>" +
                    "</block>";
                const block = Blockly.Xml.textToDom(blockText);
                xmlList.push(block);
            }
        }
        return xmlList;
    }

    function updateCode(event) {
        // console.log("event ", event);
        const code = Blockly.JavaScript.workspaceToCode(workspace);
        setCode(code);
        let arr = [];
        let topBlocks = workspace.getTopBlocks(true);
        console.log(topBlocks);
        for (let i = 0; i < topBlocks.length; i++) {
            let xml = Blockly.Xml.blockToDom(topBlocks[i]);
            let text = Blockly.Xml.domToText(xml);
            arr.push(text);
        }
        updateBlockList(arr);
    }

    useEffect(() => {
        if (!workspace) return;
        workspace.addChangeListener(updateCode);
        // var parentBlock = workspace && workspace.newBlock("move_forward");
        // parentBlock && parentBlock.initSvg();
        // parentBlock && parentBlock.render();
    }, [workspace]);

    // useEffect(() => {
    //     console.log("props ", props);
    // }, [props]);

    function highlightBlock(id) {
        // console.log("highlighting block ", workspace);
        workspace && workspace.highlightBlock(id);
    }

    const nextStep = (interpreter, stepSize = 30) => {
        // console.log("running interpreter ", interpreter);
        // let step = 1;
        if (interpreter && interpreter.step()) {
            // console.log("step ", step);
            window &&
                window.setTimeout(() => {
                    nextStep(interpreter);
                }, stepSize);
            // step = step + 1;
        } else {
            // checkEnd();
        }
    };

    useEffect(() => {
        console.log(`success props changed : ${props.success}`);
        if (props && props.success && success != props.success) {
            console.log("checking success ", props.success);
            updateSuccess(props.success);
        }
        if (props && props.toolbox && toolbox != props.toolbox) {
            updateToolbox(props.toolbox);
            workspace && workspace.updateToolbox(props.toolbox);
            workspace && workspace.clear();
        }
        if (
            props &&
            props.workspaceCode &&
            workspaceCode != props.workspaceCode
        ) {
            let arr = [];
            updateWorkspaceCode(props.workspaceCode);
            for (let i = 0; i < props.workspaceCode.length; i++) {
                let dom = Blockly.Xml.textToDom(props.workspaceCode[i]);
                let ws = Blockly.Xml.domToWorkspace(dom, workspace);
                console.log(dom);
                console.log(workspace);
                let block = Blockly.Xml.domToBlock(dom, workspace);
                console.log(block);
                // arr.push(block);
            }
            props.updateDeploy(true);
            runCode();
        }
        if (props && props.deployed && deployed != props.deployed) {
            updateDeployed(props.deployed);
        }
    }, [
        props && props.success,
        props && props.toolbox,
        props && props.workspaceCode,
        props && props.deployed
    ]);

    function resetCode() {
        // setCode(undefined);
        // setWorkspace(
        //     Blockly.inject("blocklyDiv", {
        //         toolbox: props.toolbox || toolboxXml,
        //         grid: gridSetting,
        //         zoom: zoom,
        //         theme: theme,
        //         move: move,
        //         trashcan: true
        //     })
        // );
        props.resetCode();
    }

    function resetWorkSpace() {
        setCode(undefined);
        setWorkspace(undefined);
        setWorkspace(
            Blockly.inject("blocklyDiv", {
                toolbox: props.toolbox || toolboxXml,
                grid: gridSetting,
                zoom: zoom,
                theme: theme,
                move: move,
                trashcan: true
            })
        );
    }
    const runCode = () => {
        Blockly.JavaScript.STATEMENT_PREFIX = "highlightBlock(%1);\n";
        Blockly.JavaScript.addReservedWords("highlightBlock");
        Blockly.JavaScript.addReservedWords("workspace");

        window.LoopTrap = 1000;
        Blockly.JavaScript.INFINITE_LOOP_TRAP =
            'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
        Blockly.JavaScript.addReservedWords("code");

        const code = Blockly.JavaScript.workspaceToCode(workspace);
        function init(interpreter, scope) {
            if (!(props.highlight === false)) {
                const highlightWrapper = function(id) {
                    // console.log("highlight function called for ", id);
                    return highlightBlock(id);
                };
                interpreter.setProperty(
                    scope,
                    "highlightBlock",
                    interpreter.createNativeFunction(highlightWrapper)
                );
            }
            // Add an API function for the alert() block.
            const alertWrapper = function(text) {
                return alert(arguments.length ? text : "");
            };

            interpreter.setProperty(
                scope,
                "alert",
                interpreter.createNativeFunction(alertWrapper)
            );

            // Add an API function for the prompt() block.
            const promptWrapper = function(text) {
                return prompt(text);
            };
            interpreter.setProperty(
                scope,
                "prompt",
                interpreter.createNativeFunction(promptWrapper)
            );

            const consoleWrapper = function(text) {
                return console.log(text);
            };
            interpreter.setProperty(
                scope,
                "console",
                interpreter.createNativeFunction(consoleWrapper)
            );
            props.initApi(interpreter, scope);
        }
        try {
            const codeInterpreter = new Interpreter(code, init);
            console.log("created interpreter ", codeInterpreter);
            // codeInterpreter.run();
            nextStep(codeInterpreter, props.stepSize);
            // eval(code);
        } catch (e) {
            alert(e);
        }
    };

    const deployCode = () => {
        props.updateDeploy(true);
        // browserHistory.push({
        //     pathname: "/blockly",
        //     search: `?id=${props.nextLevel - 2}`
        // });
        resetCode();
        axiosInstance
            .post("/api/blockly/deploy", {
                id: props.nextLevel - 2,
                blockList
            })
            .then(res => {
                console.log(res.data);
                props.updateDeploy(true);
                runCode();
            })
            .catch(err => {
                if (err && err.response && err.response.data)
                    console.log(err.response.data);
            });
    };

    return (
        <Styles>
            <Modal
                open={success}
                toggle={() => {
                    updateSuccess(false);
                }}
            >
                <div className="modal-container">
                    <div className="text">Congratulations !</div>
                    <div className="text">
                        You have solved this level with __ lines of JavaScript:
                    </div>
                    <div className="code">{code}</div>
                    {props.nextLevel <= props.maxLevel && (
                        <div className="text">
                            Are you ready for level {props.nextLevel}?
                        </div>
                    )}
                    <div className="modal-buttons-container">
                        <div
                            className="modal-button cancel"
                            onClick={() => {
                                updateSuccess(false);
                            }}
                        >
                            Cancel
                        </div>
                        <div
                            className="modal-button ok"
                            onClick={() => {
                                updateSuccess(false);
                                resetWorkSpace();
                                props.openNextLevel();
                            }}
                        >
                            OK
                        </div>
                    </div>
                </div>
            </Modal>
            {!deployed && (
                <div style={{ position: "relative" }}>
                    <div className="buttons-container">
                        <div onClick={runCode} className="button run">
                            RUN
                        </div>
                        <div onClick={resetCode} className="button reset">
                            RESET
                        </div>
                        <div onClick={deployCode} className="button deploy">
                            DEPLOY
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}
                    >
                        <div
                            id="blocklyDiv"
                            style={{
                                height: 480,
                                width: 600,
                                backgroundColor: "#00f4"
                            }}
                        ></div>
                    </div>

                    <div
                        id="textarea"
                        style={{
                            height: 100,
                            width: 100,
                            backgroundColor: "#00f4"
                        }}
                    >
                        {code}
                    </div>
                </div>
            )}
        </Styles>
    );
}

export default BlocklyDemo;
