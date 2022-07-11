import { FC } from 'react';

import Konva from 'konva';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addComponentToLayer,
  pushLayer,
  setActiveLayer,
} from '../store/layers/slice';
import { ComponentShapeType } from '../types/canvas';
import { generateRandomId } from '../utils/number';
import { ToolButton } from './buttons/ToolButton';
import { SidebarLayerItem } from './SidebarLayerItem';
import { trpc } from '../services/trpc';

export const Sidebar: FC = () => {
  const { layers, activeLayer } = useAppSelector((s) => s.layers);
  const dispatch = useAppDispatch();
  const createLayer = trpc.useMutation('layers.create');
  const createComponent = trpc.useMutation('shapes.create');

  const handleNewCreate = async () => {
    const id = await createLayer.mutateAsync({
      name: `Layer ${layers.length + 1}`,
    })

    if(!id) return;

    // dispatch(
    //   pushLayer({
    //     id,
        
    //   x:
    //   y:
    //   scaleX:
    //   scaleY:
    // })

    // dispatch(
    //   addComponentToLayer({
    //     layerId: activeLayer,
    //     component: {
    //     id: generateRandomId(),
    //       name: `Rectangle 1`,
    //       shapeType: ComponentShapeType.Rectangle,
    //       style: {
    //         fillColor: Konva.Util.getRandomColor(),
    //       },
    //       size: {
    //         width: 20,
    //         height: 20,
    //       },
    //       position: {
    //         x: 10,
    //         y: 20,
    //       },
    //     },
    //   })
    // );
  };

  return (
    <SidebarWrapper>
      <h1>tvigma</h1>
      <h2>Layers</h2>
      <LayerList>
        {[...layers]
          .sort((a, b) => a.order - b.order)
          .map((layer) => (
            <SidebarLayerItem key={layer.id} {...layer} />
          ))}
      </LayerList>
      <ToolButton onClick={handleNewCreate}>Create new layer</ToolButton>
      {/* <ToolButton onClick={handleCreateRect}>RECT</ToolButton> */}
    </SidebarWrapper>
  );
};

const LayerList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SidebarWrapper = styled.div`
  flex: 0.2;
`;
