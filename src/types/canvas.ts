export enum ComponentShapeType {
  Rectangle = 'rect',
  // Circle = 'circle',
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

export interface CanvasComponent {
  id: string;
  parentLayerId: string;
  name: string;
  shapeType: ComponentShapeType;
  style: ComponentStyle;
  size: RectangleSize;
  position: ComponentPosition;
}

export type NewCanvasComponent = Omit<CanvasComponent, 'parentLayerId'>;

export interface UpdateLayerComponent
  extends Pick<CanvasComponent, 'size' | 'position'> {
  layerId: string;
  componentId: string;
}

/**
 * TODO: make different types for different components
 *
 */

//  export interface RectangleSize {
//   width: number;
//   height: number;
// }

// export interface CircleSize {
//   radius: number;
// }

// export type ComponentSize<T = ComponentShapeType> =
//   T extends ComponentShapeType.Rectangle ? RectangleSize : CircleSize;
