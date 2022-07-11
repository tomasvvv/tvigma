import { FC } from 'react';
import { Stage } from 'react-konva';
import { Provider } from 'react-redux';

import styled from 'styled-components';
import { trpc } from '../services/trpc';

import { store } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setActiveComponent } from '../store/layers/slice';
import { LayerWithComponents } from './LayerWithComponents';

export const Canvas: FC = () => {
  const { data: layersData } = trpc.useQuery(['layers.getAll']);
  

  const { layers, activeComponent } = useAppSelector((s) => s.layers);
  const dispatch = useAppDispatch();

  const handleClick = ({ target: { attrs } }: any) => {
    if (!attrs.id && activeComponent) {
      dispatch(setActiveComponent(undefined));
    }
  };

  return (
    <CanvasWrapper>
      <Stage
        height={window.innerHeight - 200}
        onClick={handleClick}
        width={window.innerWidth - 500}
      >
        {/**
         * A way to bridge redux with konvajs stage
         * Otherwise react-redux will crash 
         */}
        <Provider store={store}>
          {layers.map((l) => (
            <LayerWithComponents {...l} />
          ))}
        </Provider>
      </Stage>
    </CanvasWrapper>
  );
};

const CanvasWrapper = styled.div`
  flex: 1;
`;
