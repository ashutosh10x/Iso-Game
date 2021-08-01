import React, { Component } from "react";
import Styles from "./styles";
import simpleGridInterpreter from "./simpleGridInterpreters";

const marker = "https://i.imgur.com/VPrO6g2.png";
const manLogo = "https://i.ibb.co/RyWJsZK/human.png";
const backgroudImage = "https://i.imgur.com/ggPtWzB.jpg";
const INCORRECT_SOUND =
  "https://s3.ap-south-1.amazonaws.com/lqcdndata/notification_audio_files/incorrect_answer.mp3";

const grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const object_map = {
  0: {
    object: (
      <div
        style={{
          background: "#f50",
          width: "100%",
          height: "100%",
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "#f10",
        }}
      />
    ),
    direction: 0,
    obstacle: true,
  },
  1: {
    object: (
      <div
        style={{
          background: "#ff0",
          width: "100%",
          height: "100%",
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "#ff8",
        }}
      />
    ),
    direction: 0,
    obstacle: true,
  },
  3: {
    object: (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          borderStyle: "solid",
          borderWidth: 0.5,
          borderColor: "#f10",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={"https://i.imgur.com/VPrO6g2.png"} />
      </div>
    ),
    direction: 180,
    obstacle: false,
  },
};

class InterfaceGui extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      step_size: 0,
      grid_size: props.grid_size || 10,
      start_pos: props.start_pos || [6, 2],
      current_pos: props.start_pos || [6, 2],
      destination: props.destination || [6, 5],
      start_direction_degrees: props.direction_degrees || 0,
      direction_degrees: props.direction_degrees || 0,
      backgroundImage: props.backgroudImage || backgroudImage,
      left: 100,
      top: 100,
      cellArray: [],
      grid: props.grid || grid,
      object_map: props.object_map || object_map,
      character: props.character || manLogo,
      widthPerc: props.widthPerc || 0.5,
      state_map: [],
    };

    this.block_map = [];
  }

  componentDidMount() {
    this.setState({ backgroudImage: this.props.backgroudImage });
    this.update();
    window && window.addEventListener("resize", this.update);
  }

  componentWillUnmount() {
    window && window.removeEventListener("resize", this.update);
  }

  update = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    const lower_dim = Math.min(width, height);

    const step_size = Math.floor(
      (width * this.state.widthPerc) / this.state.grid_size
    );
    width = this.state.grid_size * step_size;
    height = this.state.grid_size * step_size;

    this.setState({
      height: height,
      width: width,
      step_size: step_size,
    });
  };

  checkDestination = () => {
    // console.log("checking destination")
    // console.log(this.state.current_pos);
    // console.log(this.state.destination);
    if (
      this.state.current_pos[0] === this.state.destination[0] &&
      this.state.current_pos[1] === this.state.destination[1]
    ) {
      return true;
    }
    return false;
  };

  getCurrentState = () => {
    return [
      this.state.current_pos[0],
      this.state.current_pos[1],
      this.state.direction_degrees,
    ];
  };

  getStatemap = () => {
    return this.state.state_map;
  };

  render_scene = () => {
    console.log(this.state.width, this.state.height);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        {this.state.grid &&
          this.state.grid.map((grid_row, i) => {
            const row_node = grid_row.map((cell, j) => {
              let object = object_map[cell].object;
              if (
                this.state.destination[0] == i &&
                this.state.destination[1] == j
              ) {
                return (
                  <div
                    style={{
                      width: this.state.step_size,
                      height: this.state.step_size,
                      flex: 1,
                      display: "flex",
                      transform: `rotate(${object_map[cell].direction}deg)`,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {object_map[3].object}
                  </div>
                );
              }
              return (
                <div
                  style={{
                    width: this.state.step_size,
                    height: this.state.step_size,
                    flex: 1,
                    display: "flex",
                    transform: `rotate(${object_map[cell].direction}deg)`,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {object}
                </div>
              );
            });
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "cneter",
                }}
              >
                {row_node}
              </div>
            );
          })}
      </div>
    );
  };

  reset = () => {
    const n_length = this.state.state_map.length;
    for (let i = 0; i < n_length; i++) {
      this.state.state_map.pop();
    }
    this.resetCharacter();
  };

  resetCharacter = () => {
    this.setState({
      current_pos: this.state.start_pos,
      direction_degrees: this.state.start_direction_degrees,
    });
  };

  positionAhead = (x, y) => {
    const element = this.state.grid[x][y];
    console.log("element ", element, x, y);
    if (element == 1) {
      return true;
    }
    return false;
  };

  showCollision = () => {
    const that = this;
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        that.turnLeft();
      }, 200 * i);
    }
  };

  moveForward = () => {
    const new_pos_x =
      this.state.current_pos[0] +
      Math.sin((this.state.direction_degrees * Math.PI) / 180);
    const new_pos_y =
      this.state.current_pos[1] +
      Math.cos((this.state.direction_degrees * Math.PI) / 180);
    if (!this.positionAhead(new_pos_x, new_pos_y)) {
      this.showCollision();
      return false;
    }
    this.setState({
      current_pos: [new_pos_x, new_pos_y],
    });
    this.state.state_map.push([
      new_pos_x,
      new_pos_y,
      this.state.direction_degrees,
    ]);
  };

  guiInterpreter = (interpreter, scope) => {
    let funcList = [this.moveForward, this.turnLeft, this.turnRight];
    simpleGridInterpreter(interpreter, scope, funcList);
  };

  turnLeft = () => {
    let new_direction_degrees = this.state.direction_degrees - 90;
    if (new_direction_degrees < -180) {
      new_direction_degrees = 360 + new_direction_degrees;
    }

    this.setState({ direction_degrees: new_direction_degrees });
    this.state.state_map.push([
      this.state.current_pos[0],
      this.state.current_pos[1],
      new_direction_degrees,
    ]);
  };

  turnRight = () => {
    let new_direction_degrees = this.state.direction_degrees + 90;
    if (new_direction_degrees > 180) {
      new_direction_degrees = new_direction_degrees - 360;
    }
    this.setState({ direction_degrees: new_direction_degrees });
    this.state.state_map.push([
      this.state.current_pos[0],
      this.state.current_pos[1],
      new_direction_degrees,
    ]);
  };

  render() {
    return (
      <div
        style={{
          width: this.state.width,
          height: this.state.height,
          backgroundImage: this.state.backgroudImage,
          position: "relative",
        }}
      >
        {this.render_scene()}

        <div
          style={{
            display: "flex",
            position: "absolute",
            top: this.state.current_pos[0] * this.state.step_size,
            left: this.state.current_pos[1] * this.state.step_size,
            width: this.state.step_size,
            height: this.state.step_size,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <img
            src={this.state.character}
            style={{
              maxWidth: this.state.step_size * 0.9,
              maxHeight: this.state.step_size * 0.9,
              transform: `rotate(${this.state.direction_degrees}deg)`,
            }}
          />
        </div>
        {/* <div
          style={{
            position: "absolute",
            top: this.state.destination[1] * this.step_size,
            left: this.state.destination[0] * this.step_size,
          }}
        >
          <img src={marker} />
        </div> */}
      </div>
    );
  }
}

export default InterfaceGui;
