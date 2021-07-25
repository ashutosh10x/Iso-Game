import React, { Fragment, Component } from 'react';
import Blockly from 'blockly';
import Interpreter from 'js-interpreter';

import '../../blockly/generators/index.js';
import '../../blockly/blocks/index.js';

import BlocklyWorkSpace from '../Blockly';
import GameEnvironment from '../IsometricGame/pixiGameEngine/index';
import Styles from './blockStyles';
import { toolboxXml } from './constant';

class PlayGround extends Component {
  constructor(props) {
    super(props);
    this.guiRef = React.createRef();
    this.blocklyRef = React.createRef();

    this.state = {
      toolbox: null,
      initialCode: null,
      code: null,
      stepSize: 100,
      allBlocks: null,
      stateMap: null,
    };
  }

  updateCode = (code) => {
    this.setState({ code });
  };

  resetCode = () => {
    this.blocklyRef &&
      this.blocklyRef.current &&
      this.blocklyRef.current.resetWorkspace();
    this.setState({ code: null, allBlocks: null });
  };

  runCode = () => {
    this.setState({
      allBlocks:
        this.blocklyRef.current && this.blocklyRef.current.getAllBlocks(),
    });

    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.addReservedWords('highlightBlock');
    Blockly.JavaScript.addReservedWords('workspace');

    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
      'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
    Blockly.JavaScript.addReservedWords('code');

    try {
      const codeInterpreter = new Interpreter(
        this.state.code,
        this.guiRef && this.guiRef.current && this.guiRef.current.guiInterpreter
      );
      this.nextStep(codeInterpreter, this.state.stepSize);
    } catch (e) {
      console.error(e, 'failure while running the code');
    }
  };

  nextStep(interpreter, stepSize = 30) {
    if (interpreter && interpreter.step()) {
      window &&
        window.setTimeout(() => {
          const value = interpreter.value;
          if (value === false) return;
          this.nextStep(interpreter);
        }, stepSize);
    } else {
      // const is_completed = this.checkEnd();
      // if (is_completed) this.handleSuccess();
      // else this.handleFailure();
    }
  }

  render() {
    return (
      <Styles>
        <div className="buttons-container">
          <div onClick={this.runCode} className="button run">
            RUN
          </div>
          <div onClick={this.resetCode} className="button reset">
            RESET
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <BlocklyWorkSpace
            toolbox={toolboxXml}
            updateCode={this.updateCode}
            ref={this.blocklyRef}
          />
          <GameEnvironment ref={this.guiRef} />
        </div>
      </Styles>
    );
  }
}

export default PlayGround;
