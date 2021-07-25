import { Point } from 'pixi.js';

export const cartesianToIsometric = (cartPt) => {
  let tempPoint = new Point();
  tempPoint.x = cartPt.x - cartPt.y;
  tempPoint.y = (cartPt.x + cartPt.y) / 2;
  return tempPoint;
};

export const isometricToCartesian = (isoPt) => {
  let tempPt = new Point();
  tempPt.x = (2 * isoPt.y + isoPt.x) / 2;
  tempPt.y = (2 * isoPt.y - isoPt.x) / 2;
  return tempPt;
};

export const getTileCoordinates = (cartPt, tileHeight) => {
  let tempPt = new Point();
  tempPt.x = Math.floor(cartPt.x / tileHeight);
  tempPt.y = Math.floor(cartPt.y / tileHeight);
  return tempPt;
};
