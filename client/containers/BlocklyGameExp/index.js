import React from "react";
import BlocklyGame from "./BlocklyGame";
import Styles from "./styles";

export default class GameHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            selected: 0,
            part: [
                {
                    pathArray: [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 2, 1, 3, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    ],
                    toolbox: `
                <xml id="toolbox" style="display: none">
                  <block type="up_arrow"></block>
                  <block type="move_forward"></block>
                  <block type="right_arrow"></block>
                  <block type="turn_right"></block>
                  <block type="left_arrow"></block>
                  <block type="turn_left"></block>
                </xml>
                `
                },
                {
                    pathArray: [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 1, 3, 0, 0, 0],
                        [0, 0, 0, 0, 2, 1, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    ],
                    toolbox: `
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
                `
                },
                {
                    pathArray: [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 2, 1, 1, 1, 1, 1, 1, 3, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    ],
                    toolbox: `
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
                `
                },
                {
                    pathArray: [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                        [0, 0, 0, 0, 0, 0, 0, 3, 1, 0],
                        [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
                        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                        [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
                        [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
                        [0, 2, 1, 0, 0, 0, 0, 0, 0, 0],
                        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    ],
                    toolbox: `
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
                `
                },
                {
                    pathArray: [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
                        [0, 0, 0, 0, 2, 1, 1, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    ],
                    toolbox: `
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
                `
                },
                {
                    pathArray: [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
                        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
                        [0, 0, 1, 1, 3, 0, 0, 1, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                        [0, 0, 2, 1, 1, 1, 1, 1, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    ],
                    toolbox: `
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
                `
                }
            ]
        };
    }

    handleClick = index => {
        this.setState({ selected: index });
    };

    openNextLevel = () => {
        this.setState({ selected: this.state.selected + 1 });
    };

    render() {
        return (
            <Styles>
                {!this.state.playing && (
                    <>
                        <h3 style={{ textAlign: "center" }}>
                            LogIQids's First Step In Games{" "}
                        </h3>
                        <div className="pagination-box">
                            {this.state.part.map((ele, index) => {
                                return (
                                    <div
                                        className={`part-marker ${this.state
                                            .selected == index &&
                                            "selected-marker"}`}
                                        onClick={() => {
                                            this.handleClick(index);
                                        }}
                                    >
                                        {index + 1}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
                <BlocklyGame
                    map={this.state.part[this.state.selected].pathArray}
                    toolbox={this.state.part[this.state.selected].toolbox}
                    openNextLevel={this.openNextLevel}
                    nextLevel={this.state.selected + 2}
                    updatePlaying={bool => {
                        this.setState({ playing: bool });
                    }}
                    playing={this.state.playing}
                />
            </Styles>
        );
    }
}
