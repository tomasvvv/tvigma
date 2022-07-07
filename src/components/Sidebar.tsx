import { FC } from 'react';

import Konva from 'konva';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addComponentToLayer,
  pushLayer,
  setActiveLayer,
} from '../store/layers';
import { ComponentShapeType } from '../types/canvas';
import { generateRandomId } from '../utils/number';
import { SidebarLayerItem } from './SidebarLayerItem';

export const Sidebar: FC = () => {
  const { layers, activeLayer } = useAppSelector((s) => s.layers);
  const dispatch = useAppDispatch();

  const handleNewCreate = () => {
    const id = generateRandomId();
    dispatch(
      pushLayer({
        id,
        order: layers.length,
        canvasComponents: [],
        name: `Layer ${layers.length + 1}`,
      })
    );
    dispatch(setActiveLayer(id));
  };

  const handleCreateRect = () => {
    if (!activeLayer) return;

    dispatch(
      addComponentToLayer({
        layerId: activeLayer,
        component: {
          id: generateRandomId(),
          name: `Rectangle 1`,
          shapeType: ComponentShapeType.Rectangle,
          style: {
            fillColor: Konva.Util.getRandomColor(),
          },
          size: {
            width: 20,
            height: 20,
          },
          position: {
            x: 10,
            y: 20,
          },
        },
      })
    );
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
      <button onClick={handleNewCreate} type="button">
        Create new layer
      </button>
      <button onClick={handleCreateRect} type="button">
        RECT
      </button>
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
