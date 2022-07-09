import { CanvasComponent } from './canvas';

export interface LayerBase {
  id: string;
  order: number;
  name: string;
}

export interface Layer extends LayerBase {
  canvasComponents: CanvasComponent[];
}

export interface LayerSliceState {
  layers: Layer[];
  activeLayer: Layer['id'] | undefined;
  activeComponent: CanvasComponent['id'] | undefined;
}

export type TransformationEvent = Partial<
  Pick<CanvasComponent, 'size' | 'position'>
>;
