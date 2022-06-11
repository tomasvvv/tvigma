import { Layer } from './layers';

export enum ComponentShapeType {
  Rectangle = 'rect',
  Circle = 'circle',
}

export interface ComponentStyle {
  fillColor?: string;
  strokeColor?: string;
}

export interface ComponentPosition {
  x: number;
  y: number;
}

export interface RectangleSize {
  width: number;
  height: number;
}

export interface CircleSize {
  radius: number;
}

export interface CanvasComponent {
  id: string;
  parentLayerId: Layer['id'];
  name: string;
  shapeType: ComponentShapeType;
  style: ComponentStyle;
  size: ComponentSize;
  position: ComponentPosition;
}

export type NewCanvasComponent = Omit<CanvasComponent, 'parentLayerId'>;

export type ComponentSize<T = ComponentShapeType> =
  T extends ComponentShapeType.Rectangle ? RectangleSize : CircleSize;
