import { cloneElement, FC, ReactElement, useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setActiveComponent } from '../store/layers';
import { CanvasComponent } from '../types/canvas';
import { TransformationEvent } from '../types/layers';

interface Props extends Partial<CanvasComponent> {
  onTransform: (e: TransformationEvent) => void;
  children: ReactElement;
}

export const CanvasTransformerComponent: FC<Props> = ({
  onTransform,
  id,
  children,
  ...props
}) => {
  const transformerRef = useRef<any>();
  const shapeRef = useRef<any>();
  const dispatch = useAppDispatch();
  const { activeComponent } = useAppSelector((s) => s.layers);

  console.log(`activeComponent,id`, activeComponent, id);

  const isSelected = activeComponent === id;

  useEffect(() => {
    if (!isSelected) return;

    transformerRef.current.nodes([shapeRef.current]);
    transformerRef.current.getLayer().batchDraw();
  }, [isSelected]);

  const handleTransformEnd = () => {
    const node = shapeRef.current;
    const [scaleX, scaleY] = [node.scaleX(), node.scaleY()];
    const [x, y] = [node.x(), node.y()];
    const [width, height] = [node.width(), node.height()];

    node.scaleX(1);
    node.scaleY(1);

    onTransform({
      position: {
        x,
        y,
      },
      size: {
        width: Math.max(5, width * scaleX),
        height: Math.max(height * scaleY),
      },
    });
  };

  const handleDragEnd = ({
    target: {
      attrs: { x, y },
    },
  }: any) => {
    console.log(`drag end`);
    // dispatch(setActiveComponent(undefined));
    onTransform?.({
      position: {
        x,
        y,
      },
    });
  };

  return (
    <>
      {cloneElement(children, {
        onTransformEnd: handleTransformEnd,
        onDragEnd: handleDragEnd,
        ref: shapeRef,
        draggable: isSelected,
        ...props,
      })}

      {isSelected && (
        <Transformer
          // boundBoxFunc={(_oldBox, newBox) => newBox}
          ref={transformerRef}
        />
      )}
    </>
  );
};
