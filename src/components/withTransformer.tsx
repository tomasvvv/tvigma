import { useEffect, useRef } from 'react';
import { KonvaNodeComponent, Transformer } from 'react-konva';

type ComponentType = KonvaNodeComponent<any, any> | null;

export const withTransformer = (Component: ComponentType) => (props: any) => {
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

    node.scaleX(1);
    node.scaleY(1);
  };

  return (
    <>
      <Component
        // onClick={handleSelect}
        // onTap={handleSelect}
        // onTransformEnd={handleTransformEnd}
        // ref={shapeRef}
        {...props}
      />
      {/* {isSelected && (
          <Transformer
            boundBoxFunc={(_oldBox, newBox) => newBox}
            // ref={transformerRef}
          />
        )} */}
    </>
  );
};
