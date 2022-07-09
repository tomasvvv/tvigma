import { FC } from 'react';

import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  removeLayer,
  setActiveComponent,
  setActiveLayer,
} from '../store/layers';
import { CanvasComponent } from '../types/canvas';
import { Layer } from '../types/layers';

interface SidebarLayerItemProps extends Layer {}

export const SidebarLayerItem: FC<SidebarLayerItemProps> = ({
  id,
  name,
  canvasComponents,
}) => {
  const { activeLayer, activeComponent } = useAppSelector((s) => s.layers);
  const dispatch = useAppDispatch();

  const handleLayerClick = () => {
    if (id === activeLayer) return;
    dispatch(setActiveLayer(id));
  };

  const handleComponentClick = (componentId: CanvasComponent['id']) => {
    if (componentId === activeComponent) return;
    dispatch(setActiveComponent(componentId));
  };

  const handleLayerDelete = (layerToDelete: string) => {
    dispatch(removeLayer(layerToDelete));
  };

  return (
    <StyledLayer
      active={!!activeLayer && id === activeLayer}
      onClick={handleLayerClick}
    >
      <LayerHeader>
        <LayerTitle>{name}</LayerTitle>
        <button onClick={() => handleLayerDelete(id)} type="button">
          X
        </button>
      </LayerHeader>
      <ComponentsWrapper>
        {canvasComponents.map((c) => (
          <span key={c.id} onClick={() => handleComponentClick(c.id)}>
            {activeComponent === c.id && <span>***</span>}
            {c.name}
          </span>
        ))}
      </ComponentsWrapper>
    </StyledLayer>
  );
};

const StyledLayer = styled.span<{ active: boolean }>`
  border: ${({ active }) => `1px solid ${active ? 'black' : 'lightgray'}`};
  background: ${({ active }) => `rgba(0, 0, 0, ${active ? '0.25' : '0.05'})`};
  width: fit-content;
  cursor: pointer;
  width: 100%;
`;

const ComponentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
`;

const LayerHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LayerTitle = styled.span``;
