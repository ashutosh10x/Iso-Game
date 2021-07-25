import React, { Component, Fragment } from 'react';
import { Stage } from '@inlet/react-pixi';
import { Point } from 'pixi.js';
import SimpleView from './SimpleView';
import IsometricView from './IsometricView';
import { getTileCoordinates } from './utils';

// for simple view
import red_tile from '../../../Assets/image/red_tile.png';
import green_tile from '../../../Assets/image/green_tile.png';
import robot_tile from '../../../Assets/image/hero_tile.png';

// for isometric view
import wall from '../../../Assets/image/wall.png';
import floor from '../../../Assets/image/floor.png';
import robot_sprite_json from '../../../Assets/json/hero_8_4_41_62.json';
import robot_sprite from '../../../Assets/image/hero_8_4_41_62.png';
import ball from '../../../Assets/image/ball.png';
import ball_shadow from '../../../Assets/image/ball_shadow.png';

import simpleGridInterpreter from '../../SimpleGridBlockly/simpleGridInterpreters';

const width = 600;
const height = 350;

const levelData = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 2, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
// simple view
const props1 = {
  redTile: red_tile,
  greenTile: green_tile,
  robotTile: robot_tile,
  tileWidth: 50,
  levelData: levelData,
  position: {
    x: 450,
    y: 10,
  },
};

const wallGraphicHeight = 98;

const floorGraphicWidth = 103;
const floorGraphicHeight = 53;

const wallHeight = wallGraphicHeight - floorGraphicHeight;

// isometric view
const props2 = {
  wall: wall,
  floor: floor,
  robot_sprite: robot_sprite,
  ball: ball,
  ball_shadow: ball_shadow,
  sprite_json: robot_sprite_json,
  tileWidth: 50,
  levelData: levelData,
  wallGraphicHeight: wallGraphicHeight,
  floorGraphicWidth: floorGraphicWidth,
  wallHeight: wallHeight,
  position: {
    x: 180,
    y: 50,
  },
};

let heroGraphicWidth = 41;
let heroGraphicHeight = 62;

let heroHeight =
  floorGraphicHeight / 2 + (heroGraphicHeight - floorGraphicHeight) + 6; //adjustments to make the legs hit the middle of the tile for initial load

let heroWidth = floorGraphicWidth / 2 - heroGraphicWidth / 2; //for placing hero at the middle of the tile
let facing = 'south';
let heroSpeed = 1.2;

// const robotProps = {

// }

const directionEnum = {
  SOUTH_EAST: 'southeast',
  SOUTH: 'south',
  SOUTH_WEST: 'southwest',
  WEST: 'west',
  NORTH_WEST: 'northwest',
  NORTH: 'north',
  NORTH_EAST: 'northeast',
  EAST: 'east',
};

class PixiIsometricGame extends Component {
  constructor(props) {
    super(props);
    // this.onKeyDownHandler = this.onKeyDownHandler.bind(this);

    this.updateRobotCoordinates = this.updateRobotCoordinates.bind(this);
    this.isRobotWalkable = this.isRobotWalkable.bind(this);

    // this.guiInterpreter = this.guiInterpreter.bind(this);

    // this.moveForward = this.moveForward.bind(this);
    // this.turnLeft = this.turnLeft.bind(this);
    // this.turnRight = this.turnRight.bind(this);
    this.reset = this.reset.bind(this);

    this.state = {
      keyMap: {
        ArrowUp: 'ArrowUp',
        ArrowDown: 'ArrowDown',
        ArrowRight: 'ArrowRight',
        ArrowLeft: 'ArrowLeft',
      },
      robotProps: {
        //x & y values of the direction vector for character (robot) movement
        dX: 0,
        dY: 0,
        animationSpeed: 0,
        facing: directionEnum.SOUTH, // direction the character faces
        heroSpeed: 1,
        heroGraphicWidth: 41,
        heroGraphicHeight: 62,
        heroHeight:
          floorGraphicHeight / 2 + (heroGraphicHeight - floorGraphicHeight) + 6, //adjustments to make the legs hit the middle of t
        heroWidth: floorGraphicWidth / 2 - heroGraphicWidth / 2, //for placing hero at the middle of the tile
      },
      robotTileCoordinates: new Point(2, 3), // robot tile values in 'levelData' (given 2d array)
    };
  }

  reset() {
    console.log('i am reset');
  }

  guiInterpreter = (interpreter, scope) => {
    let funcList = [
      this.moveForward,
      this.turnLeft,
      this.turnRight,
      this.moveBackward,
    ];
    simpleGridInterpreter(interpreter, scope, funcList);
  };

  onKeyDownHandler = (eventKey) => {
    console.log('onKeyDownHandler', eventKey);
    const _keyMap = this.state.keyMap;

    let _dX = this.state.robotProps.dX;
    let _dY = this.state.robotProps.dY;
    let _facing = this.state.robotProps.facing;

    if (_keyMap.hasOwnProperty(eventKey)) {
      switch (eventKey) {
        case _keyMap.ArrowUp: {
          _dY = -1;
          _dX = 0;
          _facing = 'north';
          break;
        }

        case _keyMap.ArrowDown: {
          _dY = 1;
          _dX = 0;
          _facing = 'south';
          break;
        }

        case _keyMap.ArrowRight: {
          _dX = 1;
          if (_dY === 0) {
            _facing = 'east';
          } else if (_dY === 1) {
            _facing = 'southeast';
            _dX = _dY = 0.5;
          } else {
            _facing = 'northeast';
            _dX = 0.5;
            _dY = -0.5;
          }
          _dY = 0;
          break;
        }

        case _keyMap.ArrowLeft: {
          _dX = -1;
          if (_dY === 0) {
            _facing = 'west';
          } else if (_dY === 1) {
            _facing = 'southwest';
            _dY = 0.5;
            _dX = -0.5;
          } else {
            _facing = 'northwest';
            _dX = _dY = -0.5;
          }
          _dY = 0;
          break;
        }

        default: {
          _dX = 0;
          _dY = 0;
          break;
        }
      }
    }

    const isRobotWalkable = this.isRobotWalkable();
    if (!isRobotWalkable) {
      this.setState(
        {
          robotProps: {
            ...this.state.robotProps,
            dX: _dX,
            dY: _dY,
            facing: _facing,
            animationSpeed: 0.1,
          },
        },
        () => {
          this.updateRobotCoordinates(_dX, _dY);
        }
      );
    }
  };

  isRobotWalkable() {
    //It is not advisable to create points in update loop, but for code readability.
    let able = true;
    let _robotTileCoordinates = this.state.robotTileCoordinates;
    let _heroSpeed = this.state.robotProps.heroSpeed;
    let _dX = this.state.robotProps.dX;
    let _dY = this.state.robotProps.dY;

    let heroCornerPt = new Point(
      _robotTileCoordinates.x,
      _robotTileCoordinates.y
    );
    let cornerTL = new Point();
    cornerTL.x = heroCornerPt.x + _heroSpeed * _dX;
    cornerTL.y = heroCornerPt.y + _heroSpeed * _dY;

    // now we have the top left corner point. we need to find all 4 corners based on the map marker graphics width & height
    //ideally we should just provide the hero a volume instead of using the graphics' width & height
    let cornerTR = new Point();
    cornerTR.x = cornerTL.x;
    cornerTR.y = cornerTL.y;

    let cornerBR = new Point();
    cornerBR.x = cornerTR.x;
    cornerBR.y = cornerTL.y;

    let cornerBL = new Point();
    cornerBL.x = cornerTL.x;
    cornerBL.y = cornerBR.y;

    let newTileCorner1;
    let newTileCorner2;
    let newTileCorner3 = new Point();

    //let us get which 2 corners to check based on current facing, may be 3
    switch (facing) {
      case 'north':
        newTileCorner1 = cornerTL;
        newTileCorner2 = cornerTR;
        break;
      case 'south':
        newTileCorner1 = cornerBL;
        newTileCorner2 = cornerBR;
        break;
      case 'east':
        newTileCorner1 = cornerBR;
        newTileCorner2 = cornerTR;
        break;
      case 'west':
        newTileCorner1 = cornerTL;
        newTileCorner2 = cornerBL;
        break;
      case 'northeast':
        newTileCorner1 = cornerTR;
        newTileCorner2 = cornerBR;
        newTileCorner3 = cornerTL;
        break;
      case 'southeast':
        newTileCorner1 = cornerTR;
        newTileCorner2 = cornerBR;
        newTileCorner3 = cornerBL;
        break;
      case 'northwest':
        newTileCorner1 = cornerTR;
        newTileCorner2 = cornerBL;
        newTileCorner3 = cornerTL;
        break;
      case 'southwest':
        newTileCorner1 = cornerTL;
        newTileCorner2 = cornerBR;
        newTileCorner3 = cornerBL;
        break;
    }
    //check if those corners fall inside a wall after moving
    newTileCorner1 = getTileCoordinates(newTileCorner1, props2.tileWidth);

    if (levelData[newTileCorner1.y][newTileCorner1.x] === 1) {
      able = false;
    }
    newTileCorner2 = getTileCoordinates(newTileCorner2, props2.tileWidth);
    if (levelData[newTileCorner2.y][newTileCorner2.x] === 1) {
      able = false;
    }
    newTileCorner3 = getTileCoordinates(newTileCorner3, props2.tileWidth);
    if (levelData[newTileCorner3.y][newTileCorner3.x] === 1) {
      able = false;
    }
    return able;
  }

  updateRobotCoordinates(deltaX, deltaY) {
    let x =
      this.state.robotTileCoordinates.x +
      deltaX * this.state.robotProps.heroSpeed;
    let y =
      this.state.robotTileCoordinates.y +
      deltaY * this.state.robotProps.heroSpeed;
    this.setState({
      robotTileCoordinates: new Point(x, y),
    });
  }

  moveForward = () => {
    this.onKeyDownHandler('ArrowUp');
  };

  moveBackward = () => {
    this.onKeyDownHandler('ArrowDown');
  };

  turnLeft = () => {
    this.onKeyDownHandler('ArrowLeft');
  };

  turnRight = () => {
    this.onKeyDownHandler('ArrowRight');
  };

  render() {
    const _width = width;
    const _height = height;
    const coordinateText = `robot is on x,y: (${this.state.robotTileCoordinates.x}, ${this.state.robotTileCoordinates.y})`;
    return (
      <>
        <Stage
          width={_width}
          height={_height}
          options={{ backgroundColor: 0xeef1f5 }}
        >
          <SimpleView
            {...props1}
            robotTileCoordinates={this.state.robotTileCoordinates}
          ></SimpleView>
          <IsometricView
            {...props2}
            robotProps={this.state.robotProps}
            robotTileCoordinates={this.state.robotTileCoordinates}
          ></IsometricView>
        </Stage>
      </>
    );
  }
}

export default PixiIsometricGame;
