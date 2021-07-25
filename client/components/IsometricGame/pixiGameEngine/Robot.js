import { Container, AnimatedSprite } from '@inlet/react-pixi';
import React from 'react';
import { BaseTexture, Spritesheet } from 'pixi.js';
import robot_sprite_json from '../../../Assets/json/hero_8_4_41_62.json';
import robot_sprite from '../../../Assets/image/hero_8_4_41_62.png';

const [width, height] = [500, 500];

const Robot = (props) => {
  const [baseTextures, setBaseTextures] = React.useState({});

  React.useEffect(() => {
    const baseTexture = BaseTexture.from(robot_sprite);
    const spritesheet = new Spritesheet(baseTexture, robot_sprite_json);

    spritesheet.parse(() => {
      const _spritetextures = spritesheet.textures;
      setBaseTextures(
        Object.keys(_spritetextures).reduce((accumulator, current, i) => {
          if (i < 4) {
            accumulator['southeast'] = accumulator['southeast']
              ? accumulator['southeast'].concat(_spritetextures[current])
              : [_spritetextures[current]];
          } else if (i >= 4 && i < 8) {
            accumulator['south'] = accumulator['south']
              ? accumulator['south'].concat(_spritetextures[current])
              : [_spritetextures[current]];
          } else if (i >= 8 && i < 12) {
            accumulator['southwest'] = accumulator['southwest']
              ? accumulator['southwest'].concat(_spritetextures[current])
              : [_spritetextures[current]];
          } else if (i >= 12 && i < 16) {
            accumulator['west'] = accumulator['west']
              ? accumulator['west'].concat(_spritetextures[current])
              : [_spritetextures[current]];
          } else if (i >= 16 && i < 20) {
            accumulator['northwest'] = accumulator['northwest']
              ? accumulator['northwest'].concat(_spritetextures[current])
              : [_spritetextures[current]];
          } else if (i >= 20 && i < 24) {
            accumulator['north'] = accumulator['north']
              ? accumulator['north'].concat(_spritetextures[current])
              : [_spritetextures[current]];
          } else if (i >= 24 && i < 28) {
            accumulator['northeast'] = accumulator['northeast']
              ? accumulator['northeast'].concat(_spritetextures[current])
              : [_spritetextures[current]];
          } else {
            accumulator['east'] = accumulator['east']
              ? accumulator['east'].concat(_spritetextures[current])
              : [_spritetextures[current]];
          }
          return accumulator;
        }, {})
      );
    });
  }, []);

  if (Object.keys(baseTextures).length === 0) {
    return null;
  }

  console.log(props.robotTileCoordinates, 'robotTileCoordinates');

  return (
    <AnimatedSprite
      animationSpeed={0}
      isPlaying={true}
      x={props.robotTileCoordinates.x}
      y={props.robotTileCoordinates.y}
      textures={baseTextures[props.facing]}
      anchor={0.5}
    />
    // </Container>
  );
};

export default Robot;
