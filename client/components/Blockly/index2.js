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

function BlocklyTop(props) {
  const [workspace, setWorkspace] = useState(undefined);
  const [blockList, updateBlockList] = useState(undefined);

  useEffect(() => {
    setWorkspace(
      Blockly.inject("blocklyDiv", {
        toolbox: props.toolbox,
        grid: gridSetting,
        zoom: zoom,
        theme: theme,
        move: move,
        trashcan: true,
      })
    );

    // workspace.setTheme(theme)
  }, []);

  useEffect(() => {
    console.log("props", props);
    workspace && workspace.updateToolbox(props.toolbox);
  }, [props.toolbox]);

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
    console.log("updating code in blickly");
    props.updateCode(code);
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
    console.log("adding change listener");
    workspace.addChangeListener(updateCode);
  }, [workspace]);

  useEffect(() => {
    return workspace && workspace.removeChangeListener(updateCode);
  }, []);

  function resetWorkSpace() {
    setCode(undefined);
    setWorkspace(undefined);
    setWorkspace(
      Blockly.inject("blocklyDiv", {
        toolbox: props.toolbox,
        grid: gridSetting,
        zoom: zoom,
        theme: theme,
        move: move,
        trashcan: true,
      })
    );
  }

  function getAllBlocks(){
    const all_blocks = workspace && workspace.getAllBlocks(); 
    console.log('blocks ', all_blocks);
    return all_blocks;
  }

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

export default BlocklyTop;
