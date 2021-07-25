import React, { useRef, Fragment, useEffect, useState, Component } from "react";
import Blockly from "blockly";
import Interpreter from "js-interpreter";
import BlocklyDemo from "../Blockly";
import { Howl, Howler } from "howler";
import "../../blockly/generators/index.js";
import "../../blockly/blocks/index.js";

const path = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 3, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 2, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const marker = "https://i.imgur.com/VPrO6g2.png";
const manLogo = "https://i.ibb.co/RyWJsZK/human.png";
const backgroudImage = "https://i.imgur.com/ggPtWzB.jpg";
const INCORRECT_SOUND =
    "https://s3.ap-south-1.amazonaws.com/lqcdndata/notification_audio_files/incorrect_answer.mp3";

const toolboxXml = `
<xml id="toolbox" style="display: none">
<category name="Functions" colour="290" expanded="true">
  <block type="controls_if"></block>
  </category>
  <category name="Loops" colour="290" categorystyle="logic_category">
  <block type="text"></block>
  <block type="text_print"></block>
  <block type="custom_print"></block>
  <block type="move_forward"></block>
  <block type="turn_right"></block>
  <block type="turn_left"></block>
  <block type="controls_whileUntil"></block>
  <block type="repeat_until_destination"></block>
  </category>
</xml>
`;

const move = {
    scrollbars: true,
    drag: true,
    wheel: true
};

class BlocklyGameMove extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: 100,
            top: 100,
            direction: "east",
            cellArray: [],
            positionX: -195,
            failed: false,
            success: false
        };
        this.repeatUntilDestination = this.repeatUntilDestination.bind(this);
        this.incorrectAudio = new Howl({
            src: INCORRECT_SOUND,
            html5: true
        });
    }

    move = (step = 10) => {
        const currLeft = this.state.left;
        const currTop = this.state.top;
        let newLeft = currLeft;
        let newTop = currTop;
        let y = currLeft / 50;
        let x = currTop / 50;
        let failed, success;

        switch (this.state.direction) {
            case "east":
                if (this.props.map[x][y + 1] > 0 && !this.state.failed) {
                    if (this.props.map[x][y + 1] == 3) success = true;
                    newLeft = currLeft + step;
                    failed = false;
                } else {
                    if (!this.state.failed) this.incorrectAudio.play();
                    failed = true;
                    success = false;
                }
                break;
            case "west":
                if (this.props.map[x][y - 1] > 0 && !this.state.failed) {
                    if (this.props.map[x][y - 1] == 3) success = true;
                    newLeft = currLeft - step;
                    failed = false;
                } else {
                    if (!this.state.failed) this.incorrectAudio.play();
                    failed = true;
                    success = false;
                }
                break;
            case "north":
                if (this.props.map[x - 1][y] > 0 && !this.state.failed) {
                    if (this.props.map[x - 1][y] == 3) success = true;
                    newTop = currTop - step;
                    failed = false;
                } else {
                    if (!this.state.failed) this.incorrectAudio.play();
                    failed = true;
                    success = false;
                }
                break;
            case "south":
                if (this.props.map[x + 1][y] > 0 && !this.state.failed) {
                    if (this.props.map[x + 1][y] == 3) success = true;
                    newTop = currTop + step;
                    failed = false;
                } else {
                    if (!this.state.failed) this.incorrectAudio.play();
                    failed = true;
                    success = false;
                }
                break;
            default:
                newLeft = 100;
                newTop = 100;
                failed = false;
        }

        this.setState({ left: newLeft, top: newTop, failed, success });
    };

    turnLeft = () => {
        if (!this.state.failed) {
            let direction, positionX;
            switch (this.state.direction) {
                case "east":
                    direction = "north";
                    positionX = 0;
                    break;
                case "north":
                    direction = "west";
                    positionX = -570;
                    break;
                case "west":
                    direction = "south";
                    positionX = -380;
                    break;
                case "south":
                    direction = "east";
                    positionX = -195;
                    break;
                default:
                    direction = "east";
                    positionX = -195;
            }
            this.setState({ direction, positionX });
        }
    };

    turnRight = () => {
        if (!this.state.failed) {
            let direction;
            let positionX;
            switch (this.state.direction) {
                case "east":
                    direction = "south";
                    positionX = -380;
                    break;
                case "south":
                    direction = "west";
                    positionX = -570;
                    break;
                case "west":
                    direction = "north";
                    positionX = 0;
                    break;
                case "north":
                    direction = "east";
                    positionX = -195;
                    break;
                default:
                    direction = "east";
                    positionX = -195;
            }
            this.setState({ direction, positionX });
        }
    };

    repeatUntilDestination = () => {
        let row = this.state.top / 50;
        let col = this.state.left / 50;
        let success = false;
        if (this.props.map[row][col] == 3 || this.state.failed) {
            if (this.props.map[row][col] == 3) success = true;
            this.setState({ success });
            return false;
        }
        this.setState({ success });
        return true;
    };

    initApi = (interpreter, scope) => {
        const moveForwardWrapper = text => {
            this.move(50);
        };
        interpreter.setProperty(
            scope,
            "moveForward",
            interpreter.createNativeFunction(moveForwardWrapper)
        );
        const turnLeftWrapper = text => {
            this.turnLeft();
        };
        interpreter.setProperty(
            scope,
            "turnLeft",
            interpreter.createNativeFunction(turnLeftWrapper)
        );
        const turnRightWrapper = text => {
            this.turnRight();
        };
        interpreter.setProperty(
            scope,
            "turnRight",
            interpreter.createNativeFunction(turnRightWrapper)
        );
        const repeatUntilDestinationWrapper = () => {
            return this.repeatUntilDestination();
        };
        interpreter.setProperty(
            scope,
            "repeatUntilDestination",
            interpreter.createNativeFunction(repeatUntilDestinationWrapper)
        );
        const attachUpKeyEventWrapper = code => {
            console.log(code);

            let value = addEventListener("keydown", event => {
                if (event.keyCode == 38) {
                    switch (code.data) {
                        case "mf":
                            this.move(50);
                            break;
                        case "tl":
                            this.turnLeft();
                            break;
                        case "tr":
                            this.turnRight();
                            break;
                        default:
                            break;
                    }
                }
            });
            return value;
        };
        interpreter.setProperty(
            scope,
            "attachUpKeyEvent",
            interpreter.createNativeFunction(attachUpKeyEventWrapper)
        );
        const attachLeftKeyEventWrapper = code => {
            console.log(code);

            let value = addEventListener("keydown", event => {
                if (event.keyCode == 37) {
                    switch (code.data) {
                        case "mf":
                            this.move(50);
                            break;
                        case "tl":
                            this.turnLeft();
                            break;
                        case "tr":
                            this.turnRight();
                            break;
                        default:
                            break;
                    }
                }
            });
            return value;
        };
        interpreter.setProperty(
            scope,
            "attachLeftKeyEvent",
            interpreter.createNativeFunction(attachLeftKeyEventWrapper)
        );
        const attachRightKeyEventWrapper = code => {
            console.log(code);

            let value = addEventListener("keydown", event => {
                if (event.keyCode == 39) {
                    switch (code.data) {
                        case "mf":
                            this.move(50);
                            break;
                        case "tl":
                            this.turnLeft();
                            break;
                        case "tr":
                            this.turnRight();
                            break;
                        default:
                            break;
                    }
                }
            });
            return value;
        };
        interpreter.setProperty(
            scope,
            "attachRightKeyEvent",
            interpreter.createNativeFunction(attachRightKeyEventWrapper)
        );
    };

    componentDidUpdate(prevProps) {
        if (prevProps.map != this.props.map) {
            let start_row, start_col, dest_row, dest_col, row, col;
            for (row = 0; row < 10; row++) {
                for (col = 0; col < 10; col++) {
                    if (
                        this.props.map[row][col] == 2 ||
                        this.props.map[row][col] == 3
                    ) {
                        if (this.props.map[row][col] == 2) {
                            start_row = row;
                            start_col = col;
                        }
                        if (this.props.map[row][col] == 3) {
                            dest_row = row;
                            dest_col = col;
                        }
                        break;
                    }
                }
            }

            let cellArray = [];

            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    if (this.props.map[i][j] > 0) {
                        cellArray.push(
                            <div
                                className="cell"
                                style={{
                                    height: 50,
                                    width: 50,
                                    backgroundColor: "#ff0",
                                    display: "flex",
                                    alignItems: "centre",
                                    justifyContent: "centre"
                                }}
                            >
                                {/* <div
                                className="cell-this.props.map"
                                style={{
                                    height: 20,
                                    width: 50,
                                    backgroundColor: "#ff0"
                                }}
                            ></div> */}
                            </div>
                        );
                    } else {
                        cellArray.push(
                            <div
                                className="cell"
                                style={{
                                    height: 50,
                                    width: 50
                                    //backgroundColor: "#8fbc8f"
                                }}
                            ></div>
                        );
                    }
                }
            }

            this.setState({
                left: 50 * start_col,
                top: 50 * start_row,
                markerLeft: 50 * dest_col,
                markerTop: 50 * dest_row,
                cellArray
            });
        }
    }

    componentDidMount() {
        let start_row, start_col, dest_row, dest_col, row, col;
        for (row = 0; row < 10; row++) {
            for (col = 0; col < 10; col++) {
                if (
                    this.props.map[row][col] == 2 ||
                    this.props.map[row][col] == 3
                ) {
                    if (this.props.map[row][col] == 2) {
                        start_row = row;
                        start_col = col;
                    }
                    if (this.props.map[row][col] == 3) {
                        dest_row = row;
                        dest_col = col;
                    }
                    break;
                }
            }
        }

        let cellArray = [];

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (this.props.map[i][j] > 0) {
                    cellArray.push(
                        <div
                            className="cell"
                            style={{
                                height: 50,
                                width: 50,
                                backgroundColor: "#ff0",
                                display: "flex",
                                alignItems: "centre",
                                justifyContent: "centre"
                            }}
                        >
                            {/* <div
                                className="cell-this.props.map"
                                style={{
                                    height: 20,
                                    width: 50,
                                    backgroundColor: "#ff0"
                                }}
                            ></div> */}
                        </div>
                    );
                } else {
                    cellArray.push(
                        <div
                            className="cell"
                            style={{
                                height: 50,
                                width: 50
                                //backgroundColor: "#8fbc8f"
                            }}
                        ></div>
                    );
                }
            }
        }

        this.setState({
            left: 50 * start_col,
            top: 50 * start_row,
            markerLeft: 50 * dest_col,
            markerTop: 50 * dest_row,
            cellArray
        });
    }

    resetCode = () => {
        let start_row, start_col, dest_row, dest_col, row, col;
        for (row = 0; row < 10; row++) {
            for (col = 0; col < 10; col++) {
                if (
                    this.props.map[row][col] == 2 ||
                    this.props.map[row][col] == 3
                ) {
                    if (this.props.map[row][col] == 2) {
                        start_row = row;
                        start_col = col;
                    }
                    if (this.props.map[row][col] == 3) {
                        dest_row = row;
                        dest_col = col;
                    }
                    break;
                }
            }
        }

        this.setState({
            left: 50 * start_col,
            top: 50 * start_row,
            direction: "east",
            positionX: -195,
            failed: false
        });
    };
    render() {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    backgroundColor: this.props.deployed ? "#000" : "#fefefe",
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "space-evenly"
                }}
            >
                <BlocklyDemo
                    toolbox={this.props.toolbox}
                    initApi={this.initApi}
                    stepSize={50}
                    resetCode={this.resetCode}
                    failed={this.state.failed}
                    success={this.state.success}
                    nextLevel={this.props.nextLevel}
                    maxLevel={this.props.maxLevel}
                    openNextLevel={this.props.openNextLevel}
                    deployed={this.props.deployed}
                    updateDeploy={this.props.updateDeploy}
                    workspaceCode={this.props.workspaceCode}
                />
                <div
                    id="route-container"
                    style={{
                        width: 500,
                        height: 500,
                        display: "flex",
                        flexWrap: "wrap",
                        position: "relative"
                    }}
                    className="green-bg"
                >
                    {this.state.cellArray}
                    <div
                        className="users-marker"
                        style={{
                            top: this.state.top,
                            left: this.state.left,
                            backgroundPositionX: this.state.positionX
                        }}
                    >
                        {/* <img
                            src={manLogo}
                            style={{
                                width: 70,
                                position: "absolute",
                                top: this.state.top - 35,
                                left: this.state.left
                            }}
                        /> */}
                    </div>
                    <div>
                        <img
                            src={marker}
                            style={{
                                width: 20,
                                height: 30,
                                position: "absolute",
                                top: this.state.markerTop,
                                left: this.state.markerLeft + 15
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default BlocklyGameMove;
