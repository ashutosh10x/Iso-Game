import React from 'react';
import {
  Sprite,
  Container,
  withPixiApp,
  AnimatedSprite,
} from '@inlet/react-pixi';

const SimpleView = withPixiApp(
  class extends React.Component {
    render() {
      const _tileWidth = this.props.tileWidth;
      const _position = this.props.position;
      const commonTileSprites = this.props.levelData.map((item, i) => {
        return item.map((cell, j) => {
          const tileImage =
            cell === 0 ? this.props.greenTile : this.props.redTile;
          return (
            <Sprite
              key={i * _tileWidth + j * _tileWidth}
              anchor={0}
              width={_tileWidth}
              height={_tileWidth}
              x={j * _tileWidth}
              y={i * _tileWidth}
              image={tileImage}
            />
          );
        });
      });

      const _robotTileCoordinates = this.props.robotTileCoordinates;
      const _actualWidth = _tileWidth * 0.5;
      const _actualHeight = _tileWidth * 0.5;

      const robotTileSprite = (
        <Sprite
          key={2 * _tileWidth + 2 * _tileWidth}
          anchor={0}
          width={_actualWidth}
          height={_actualHeight}
          x={_robotTileCoordinates.x * _tileWidth + _actualWidth * 0.5}
          y={_robotTileCoordinates.y * _tileWidth + _actualHeight * 0.5}
          image={this.props.robotTile}
        />
      );
      return (
        <Container
          position={[_position.x / _position.x + 10, _position.y]}
          scale={[0.18, 0.18]}
        >
          {commonTileSprites}
          {robotTileSprite}
        </Container>
      );
    }
  }
);

export default SimpleView;
