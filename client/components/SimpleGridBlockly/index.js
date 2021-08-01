import React, { Fragment, Component } from 'react';
import Blockly from 'blockly';
import Interpreter from 'js-interpreter';

import '../../blockly/generators/index.js';
import '../../blockly/blocks/index.js';
import InterfaceGui from './InterfaceGui';
import BlocklyTop from '../Blockly';

import Styles from './styles';

const toolboxXml = `
<xml id="toolbox" style="display: none">
  <category name="Motion" colour="230" categorystyle="logic_category">
    <block type="move_forward"></block>
    <block type="turn_right"></block>
    <block type="turn_left"></block>
  </category>
  <category name="Loops" colour="290" categorystyle="loop_category">
    <block type="repeat"></block>
    <block type="controls_for"></block>
    <block type="controls_whileUntil"></block>
    <block type="repeat_until_destination"></block>
  </category>
  <category name="Conditionals" colour="290" expanded="true">
    <block type="controls_if"></block>
  </category>
  <category name="Numbers" colour="190" expanded="true">
    <block type="text"></block>
    <block type="math_number"></block>
    <block type="math_arithmetic"></block>
    <block type="math_arithmetic">
      <field name="OP">ADD</field>
      <value name="A">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="B">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
    </block>
  </category>
</xml>
`;

const required_state_map = [
  [6, 3, 0],
  [6, 4, 0],
  [6, 5, 0],
];
const action_map = [['move_forward'], ['move_forward'], []];
const abs_required_blocks = { move_forward: 1 };
const min_blocks = 2;
const min_steps = 3;

class SimpleGridBlockly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolbox: null,
      initialCode: null,
      code: null,
      stepSize: 100,
      allBlocks: null,
      stateMap: null,
    };
    this.guiRef = React.createRef();
    this.blocklyRef = React.createRef();
  }

  updateCode = (code) => {
    this.setState({ code });
  };

  checkEnd = () => {
    return (
      this.guiRef &&
      this.guiRef.current &&
      this.guiRef.current.checkDestination()
    );
  };

  nextStep = (interpreter, stepSize = 30) => {
    if (interpreter && interpreter.step()) {
      window &&
        window.setTimeout(() => {
          const value = interpreter.value;
          if (value === false) return;

          if (value) {
            console.log('interpreter ka value ', value);
            console.log(
              'state state ',
              this.guiRef &&
                this.guiRef.current &&
                this.guiRef.current.getCurrentState()
            );
          }
          this.nextStep(interpreter);
        }, stepSize);
    } else {
      const is_completed = this.checkEnd();
      if (is_completed) this.handleSuccess();
      else this.handleFailure();
    }
  };

  runCode = () => {
    console.log('running code');
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
      this.guiRef.current && this.guiRef.current.reset();
      const codeInterpreter = new Interpreter(
        this.state.code,
        this.guiRef && this.guiRef.current && this.guiRef.current.guiInterpreter
      );
      // codeInterpreter.run();
      this.nextStep(codeInterpreter, this.state.stepSize);
      // eval(code);
      this.setState({
        stateMap: this.guiRef.current && this.guiRef.current.getStatemap(),
      });
    } catch (e) {
      alert(e);
    }
  };

  resetCode = () => {
    this.blocklyRef &&
      this.blocklyRef.current &&
      this.blocklyRef.current.resetWorkspace();
    this.setState({ code: null, allBlocks: null });
  };

  requiredBlocksUsed = () => {
    const required_blocks = abs_required_blocks;
    const added_blocks = {};
    this.state.allBlocks &&
      this.state.allBlocks.map((block) => {
        const b = block['type'];
        if (added_blocks[b]) {
          added_blocks[b] = added_blocks[b] + 1;
        } else added_blocks[b] = 1;
      });

    let are_all_block_used = true;
    let block_names = [];
    required_blocks &&
      Object.keys(required_blocks).map((block) => {
        if (!(added_blocks[block] >= required_blocks[block])) {
          are_all_block_used = false;
          block_names.push(block);
        }
      });

    return [are_all_block_used, block_names];
  };

  handleSuccess = () => {
    const [required_blocks_used, blocks_not_used] = this.requiredBlocksUsed();
    const n_blocks = (this.state.allBlocks && this.state.allBlocks.length) || 0;
    console.log('final ', required_blocks_used);
    if (!required_blocks_used) {
      alert('Please use required block ' + JSON.stringify(blocks_not_used));
      return;
    }
    console.log('number of blocks used ', n_blocks);
    alert('Yay! completed');
  };

  matchState = (a, target_list) => {
    for (let i = 0; i < target_list.length; i++) {
      const b = target_list[i];
      const res = a && b && a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
      if (res) {
        console.log('matched at ', i);
        return i + 1;
      }
    }
    console.log('matched at false');
    return false;
  };

  handleFailure = () => {
    console.log('state map ', this.state.stateMap);
    const current_state_map = [...this.state.stateMap];
    const target_state_map = [...required_state_map];

    const wrong_state_list = [];
    const extra_state_list = [];

    const n_length = current_state_map.length;
    console.log(n_length);

    // place where things went wrong
    // they come back to normal in a case of single path
    // did we compelte the path and then do something wrong -> check required path comepeted but still no destination match
    for (let i = 0; i < n_length; i++) {
      const index = this.matchState(current_state_map[0], target_state_map);
      if (index) {
        current_state_map.shift();
        for (let i = 0; i < index; i++) {
          target_state_map.shift();
        }
        if (wrong_state_list.length > 0) {
          const l = [...wrong_state_list];
          extra_state_list.push(l);
          while (wrong_state_list.length > 0) {
            wrong_state_list.pop();
          }
        }
      } else {
        console.log('in wrong state');
        wrong_state_list.push(current_state_map[0]);
        current_state_map.shift();
      }
    }
    let hint = 'fufufufu';
    if (target_state_map.length === 0) {
      hint =
        'You took following extra wrong steps ' +
        JSON.stringify(wrong_state_list);
      if (extra_state_list.length > 0) {
        hint =
          hint +
          '\n You took addtional long path ' +
          JSON.stringify(extra_state_list);
      }
    } else if (target_state_map.length > 0) {
      hint = 'you had to go this path ' + JSON.stringify(target_state_map);
      if (wrong_state_list.length > 0) {
        hint =
          hint +
          '\n and you took this wrong path ' +
          JSON.stringify(wrong_state_list);
      }
      if (extra_state_list.length > 0) {
        hint =
          hint +
          '\n You took addtional long path ' +
          JSON.stringify(extra_state_list);
      }
    }
    //now we have wrong state list and remainig right path taken

    console.log('wrong state list', wrong_state_list);
    console.log('target state map uncovered ', target_state_map);
    alert(hint);
  };

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
          {/* <div onClick={deployCode} className="button deploy">
            DEPLOY
          </div> */}
        </div>
        <div style={{ flexDirection: 'row', display: 'flex' }}>
          <BlocklyTop
            toolbox={toolboxXml}
            updateCode={this.updateCode}
            ref={this.blocklyRef}
          />
          <InterfaceGui ref={this.guiRef} />
        </div>
        <div
          id="textarea"
          style={{
            height: 100,
            width: 100,
            backgroundColor: '#00f4',
          }}
        >
          {this.state.code}
        </div>
      </Styles>
    );
  }
}

export default SimpleGridBlockly;
