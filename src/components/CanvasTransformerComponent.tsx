import { cloneElement, FC, ReactElement, useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';

interface CanvasTransformerComponentProps {
  component: ReactElement;
  onChange: (x: any) => void;
}

export const CanvasTransformerComponent: FC<
  CanvasTransformerComponentProps
> = ({ component, onChange, ...props }) => {
  const transformerRef = useRef<any>();
  const shapeRef = useRef<any>();
  const isSelected = true;

  useEffect(() => {
    if (!isSelected) return;

    transformerRef.current.nodes([shapeRef.current]);
    transformerRef.current.getLayer().batchDraw();
  }, [isSelected]);

  const handleSelect = () => {};
  const handleTransformEnd = () => {
    const node = shapeRef.current;
    const [scaleX, scaleY] = [node.scaleX(), node.scaleY()];
    const [x, y] = [node.x(), node.y()];
    const [width, height] = [node.width(), node.height()];

    node.scaleX(1);
    node.scaleY(1);

    onChange({
      ...props,
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

  const handleDragEnd = ({ target: { x, y } }: any) => {
    onChange?.({ ...props, x: x(), y: y() });
  };

  return (
    <>
      {cloneElement(component, {
        onClick: handleSelect,
        onTap: handleSelect,
        onTransformEnd: handleTransformEnd,
        draggable: true,
        onDragEnd: handleDragEnd,
        ref: shapeRef,
        ...props,
      })}

      {isSelected && (
        <Transformer
          boundBoxFunc={(_oldBox, newBox) => newBox}
          ref={transformerRef}
        />
      )}
    </>
  );
};
