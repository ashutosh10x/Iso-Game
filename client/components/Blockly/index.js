import React, { useRef, Fragment, useEffect, useState, Component } from "react";
import Blockly from "blockly";

const gridSetting = { spacing: 20, length: 3, colour: "#ccc", snap: true };
const zoom = {
  controls: true,
  wheel: false,
  startScale: 1.0,
  maxScale: 3,
  minScale: 0.3,
  scaleSpeed: 1.2,
};

const blockStyles = {
  list_blocks: {
    colourPrimary: "#4a148c",
    colourSecondary: "#AD7BE9",
    colourTertiary: "#CDB6E9",
  },
  logic_blocks: {
    colourPrimary: "#01579b",
    colourSecondary: "#64C7FF",
    colourTertiary: "#C5EAFF",
  },
};

const categoryStyles = {
  list_category: {
    colours: "#4a148c",
  },
  logic_category: {
    colour: "#01579b",
  },
};

const theme = Blockly.Theme("blockly2", blockStyles, categoryStyles);

const move = {
  scrollbars: true,
  drag: true,
  wheel: true,
};

class BlocklyTop extends Component {
  constructor(props) {
    super(props);
    this.state = { workspace: undefined, blockList: undefined };
  }

  componentDidMount() {
    this.setWorkspace();
  }

  setWorkspace = () => {
    this.setState(
      {
        workspace: Blockly.inject("blocklyDiv", {
          toolbox: this.props.toolbox,
          grid: gridSetting,
          zoom: zoom,
          theme: theme,
          move: move,
          trashcan: true,
        }),
      },
      () => {
        this.state.workspace &&
          this.state.workspace.updateToolbox(this.props.toolbox);
        this.state.workspace &&
          this.state.workspace.registerToolboxCategoryCallback(
            "COLOUR_PALETTE",
            this.coloursFlyoutCallback
          );
        this.state.workspace &&
          this.state.workspace.addChangeListener(this.updateCode);
      }
    );
  };

  componentWillUnmount() {
    this.state.workspace &&
      this.state.workspace.removeChangeListener(this.updateCode);
    this.state.workspace && this.state.workspace.dispose();
  }

  coloursFlyoutCallback = () => {
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
  };

  updateCode = (event) => {
    const code = Blockly.JavaScript.workspaceToCode(this.state.workspace);
    // console.log("updating code in blockly");
    this.props.updateCode(code);
    let arr = [];
    let topBlocks = this.state.workspace.getTopBlocks(true);
    // console.log(topBlocks);
    for (let i = 0; i < topBlocks.length; i++) {
      let xml = Blockly.Xml.blockToDom(topBlocks[i]);
      let text = Blockly.Xml.domToText(xml);
      arr.push(text);
    }
    this.setState({ blockList: arr });
  };

  resetWorkspace = () => {
    // this.props.updateCode(undefined);
    this.state.workspace && this.state.workspace.clear();
  };

  getAllBlocks = () => {
    const all_blocks =
      this.state.workspace && this.state.workspace.getAllBlocks();
    console.log("blocks ", all_blocks);
    return all_blocks;
  };

  render() {
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            id="blocklyDiv"
            style={{
              height: 480,
              width: 600,
              backgroundColor: "#00f4",
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default BlocklyTop;
