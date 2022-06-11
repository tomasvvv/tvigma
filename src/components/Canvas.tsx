import { FC } from 'react';
import { Circle, Layer, Rect, Stage } from 'react-konva';

import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setActiveLayer } from '../store/layers';
import {
  CanvasComponent,
  CircleSize,
  ComponentShapeType,
  RectangleSize,
} from '../types/canvas';

export const Canvas: FC = () => {
  const { layers, activeLayer } = useAppSelector((s) => s.layers);
  const dispatch = useAppDispatch();

  const drawCanvasComponent = (canvasComponents: CanvasComponent) => {
    const {
      position: { x, y },
      size,
      style,
      parentLayerId,
      shapeType,
    } = canvasComponents;

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
    };

    switch (shapeType) {
      case ComponentShapeType.Rectangle: {
        return (
          <Rect
            height={(size as RectangleSize).height}
            width={(size as RectangleSize).width}
            x={x}
            y={y}
            {...commonProps}
          />
        );
      }

      case ComponentShapeType.Circle: {
        return (
          <Circle
            radius={(size as CircleSize).radius}
            x={x}
            y={y}
            {...commonProps}
          />
        );
      }

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
            {layer.canvasComponents.map((comp) => drawCanvasComponent(comp))}
          </Layer>
        ))}
      </Stage>
    </CanvasWrapper>
  );
};

const CanvasWrapper = styled.div`
  flex: 1;
`;
