import React, { Component } from 'react';
import { Sprite, Container, withPixiApp } from '@inlet/react-pixi';
import { Point } from 'pixi.js';
import { cartesianToIsometric } from './utils';
import RobotSprite from './Robot';

const IsometricView = withPixiApp(
  class extends Component {
    constructor(props) {
      super(props);
      this.getIsometricCoordinates = this.getIsometricCoordinates.bind(this);
      this.getRobotIsometricCoordinates = this.getRobotIsometricCoordinates.bind(
        this
      );
    }

    getIsometricCoordinates = (cell, x, y) => {
      let _tileWidth = this.props.tileWidth;
      let _wallHeight = this.props.wallHeight;
      let _position = this.props.position;

      let isoPt = new Point();
      let cartPt = new Point();

      cartPt.x = x * _tileWidth;
      cartPt.y = y * _tileWidth;

      isoPt = cartesianToIsometric(cartPt);

      let isometricCoordinates = new Point();

      if (cell === 1) {
        (isometricCoordinates.x = isoPt.x + _position.x),
          (isometricCoordinates.y = isoPt.y + _position.y - _wallHeight);
      } else {
        (isometricCoordinates.x = isoPt.x + _position.x),
          (isometricCoordinates.y = isoPt.y + _position.y);
      }
      return isometricCoordinates;
    };

    getRobotIsometricCoordinates = (robotTileCoordinates) => {
      let isoPt = new Point(); //It is not advisable to create points in update loop
      let _tileWidth = this.props.tileWidth;
      let _position = this.props.position;
      let heroCornerPt = new Point(
        robotTileCoordinates.x * _tileWidth + _tileWidth / 4,
        robotTileCoordinates.y * _tileWidth + _tileWidth / 4
      );
      isoPt = cartesianToIsometric(heroCornerPt); //find new isometric position for hero from 2D map position

      let isometricCoordinates = new Point();
      let _heroWidth = this.props.robotProps.heroWidth;
      let _heroHeight = this.props.robotProps.heroHeight;

      isometricCoordinates.x = isoPt.x + _position.x + _heroWidth;
      isometricCoordinates.y = isoPt.y + _position.y - _heroHeight;

      return isometricCoordinates;
    };

    render() {
      const _position = this.props.position;
      const _tileWidth = this.props.tileWidth;
      let commonIsoSprites = this.props.levelData.map((rowGrid, i) => {
        return rowGrid.map((cell, j) => {
          let _isoImage = cell === 1 ? this.props.wall : this.props.floor;
          let isometricCoordiantes = this.getIsometricCoordinates(cell, j, i);
          return (
            <Sprite
              key={i * _tileWidth + j * _tileWidth}
              anchor={0}
              x={isometricCoordiantes.x}
              y={isometricCoordiantes.y}
              image={_isoImage}
            />
          );
        });
      });
      const robotIsoCoordinates = this.getRobotIsometricCoordinates(
        this.props.robotTileCoordinates
      );
      return (
        <Container
          position={[_position.x - _position.x / 3, _position.y]}
          scale={[0.4, 0.4]}
        >
          {commonIsoSprites}
          <RobotSprite
            {...this.props.robotProps}
            robotTileCoordinates={robotIsoCoordinates}
          />
        </Container>
      );
    }
  }
);

export default IsometricView;
