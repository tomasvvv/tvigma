import { FC } from 'react';
import { Circle, Layer, Rect, Stage } from 'react-konva';

import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setActiveLayer, updateLayerComponent } from '../store/layers';
import {
  CanvasComponent,
  // CircleSize,
  ComponentShapeType,
  RectangleSize,
  UpdateLayerComponent,
} from '../types/canvas';
import { CanvasTransformerComponent } from './CanvasTransformerComponent';

export const Canvas: FC = () => {
  const { layers, activeLayer } = useAppSelector((s) => s.layers);
  const dispatch = useAppDispatch();

  const drawCanvasComponent = (canvasComponent: CanvasComponent) => {
    const {
      position: { x, y },
      size,
      style,
      parentLayerId,
      shapeType,
      id,
    } = canvasComponent;

    const switchActiveLayerIfNeeded = () => {
      if (activeLayer !== parentLayerId) {
        dispatch(setActiveLayer(parentLayerId));
      }
    };

    const commonProps = {
      fill: style.fillColor,
      draggable: true,
      onClick: switchActiveLayerIfNeeded,
      onDragStart: switchActiveLayerIfNeeded,
      x,
      y,
      key: id,
    };

    switch (shapeType) {
      case ComponentShapeType.Rectangle: {
        return (
          <CanvasTransformerComponent
            component={<Rect />}
            onChange={(data: UpdateLayerComponent) => {
              console.log(`Component changed`, data);
              dispatch(updateLayerComponent(data));
            }}
            {...commonProps}
          />
        );
      }

      // case ComponentShapeType.Circle: {
      //   return <Circle radius={(size as CircleSize).radius} {...commonProps} />;
      // }

      default: {
        return null;
      }
    }
  };

  return (
    <CanvasWrapper>
      <Stage height={window.innerHeight - 200} width={window.innerWidth - 500}>
        {layers.map((layer) => (
          <Layer key={layer.id}>
            {layer.canvasComponents.map(drawCanvasComponent)}
          </Layer>
        ))}
      </Stage>
    </CanvasWrapper>
  );
};

const CanvasWrapper = styled.div`
  flex: 1;
`;
