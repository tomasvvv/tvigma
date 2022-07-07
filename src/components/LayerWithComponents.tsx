import { Layer as KonvaLayer, Rect } from 'react-konva';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setActiveComponent,
  setActiveLayer,
  updateLayerComponent,
} from '../store/layers';
import { Layer, TransformationEvent } from '../types/layers';
import { CanvasTransformerComponent } from './CanvasTransformerComponent';

export const LayerWithComponents = ({ id, canvasComponents }: Layer) => {
  const dispatch = useAppDispatch();
  const { activeLayer, activeComponent } = useAppSelector((s) => s.layers);

  return (
    <KonvaLayer key={id}>
      {canvasComponents.map(({ size, id, parentLayerId, position, style }) => {
        const switchActiveLayerIfNeeded = () => {
          console.log(`clicked,`, activeComponent, id);

          if (activeLayer !== parentLayerId) {
            dispatch(setActiveLayer(parentLayerId));
          }

          if (activeComponent !== id) {
            dispatch(setActiveComponent(id));
          }
        };

        const handleTransformation = (data: TransformationEvent) => {
          dispatch(
            updateLayerComponent({
              layerId: parentLayerId,
              componentId: id,
              ...data,
            })
          );
        };

        return (
          <CanvasTransformerComponent
            id={id}
            key={id}
            onTransform={handleTransformation}
          >
            <Rect
              fill={style.fillColor}
              height={size.height}
              id={id}
              onChange={handleTransformation}
              onClick={switchActiveLayerIfNeeded}
              // onDragStart={switchActiveLayerIfNeeded}
              width={size.width}
              x={position.x}
              y={position.y}
            />
          </CanvasTransformerComponent>
        );
      })}
    </KonvaLayer>
  );
};